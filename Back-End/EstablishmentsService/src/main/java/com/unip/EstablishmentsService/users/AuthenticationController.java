package com.unip.EstablishmentsService.users;


import com.unip.EstablishmentsService.users.dtos.LoginRequestDTO;
import com.unip.EstablishmentsService.users.dtos.LoginResponseDTO;
import com.unip.EstablishmentsService.users.dtos.RegisterRequestDTO;
import com.unip.EstablishmentsService.users.dtos.UserRequestDTO;
import com.unip.EstablishmentsService.infra.JwtService;
import com.unip.EstablishmentsService.necessities.Necessity;
import com.unip.EstablishmentsService.necessities.NecessityService;
import com.unip.EstablishmentsService.users.exceptions.UserNotFoundException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
@SecurityRequirement(name = "bearerToken")
@Tag(name = "Autenticação", description = "Endpoints de login, registro, atualização e logout de usuários")
public class AuthenticationController {

    private final UserService service;
    private final UserRepository repository;
    private final NecessityService necessityService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;


    @PostMapping("/login")
    @Operation(summary = "Login do usuário", description = "Autentica o usuário e retorna access token; também define cookie de refresh token.")
    @ApiResponse(responseCode = "200", description = "Autenticação bem-sucedida")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody @Valid LoginRequestDTO request,
            HttpServletResponse response
    ){

        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(request.email(), request.password());
            var auth = authenticationManager.authenticate(usernamePassword);
            User user = (User) auth.getPrincipal();
            String accessToken = jwtService.generateToken(user, Token.ACCESS_TOKEN);
            String refreshToken = jwtService.generateToken(user, Token.REFRESH_TOKEN);

            ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                    .httpOnly(true)
                    .secure(false)
                    .sameSite("Strict")
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60)
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return ResponseEntity.ok().body(userMapper.userToLoginResponseDTO(user, accessToken));
        } catch (Exception e){
            throw new UserNotFoundException("Usuario não encontrado");
        }

    }

    @PostMapping("/register")
    @Operation(summary = "Registro de usuário", description = "Cria um novo usuário e retorna tokens de sessão.")
    @ApiResponse(responseCode = "200", description = "Registro bem-sucedido")
    public ResponseEntity<LoginResponseDTO> register(
            @RequestBody @Valid RegisterRequestDTO request,
            HttpServletResponse response
    ){

        List<Necessity> necessities = new ArrayList<>();
        for (Necessity necessity: request.necessities()) {
            try {
                necessities.add(necessityService.getNecessityById(necessity.getNecessityId()));
            } catch (Exception e) {
                e.printStackTrace();
                break;
            }

        }
        System.out.println(request.necessities());
        User user = User.builder()
                .email(request.email())
                .fName(request.fName())
                .lName(request.lName())
                .necessities(necessities)
                .password(new BCryptPasswordEncoder().encode(request.password()))
                .role(Role.ROLE_USER)
                .enabled(true)
                .build();

        repository.save(user);

        String accessToken = jwtService.generateToken(user, Token.ACCESS_TOKEN);
        String refreshToken = jwtService.generateToken(user, Token.REFRESH_TOKEN);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false)  //TODO: alterar para seguro com certificado SSL
                .sameSite("Strict")
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().body(userMapper.userToLoginResponseDTO(user, accessToken));
    }

    @PutMapping("/update")
    @Operation(summary = "Atualiza perfil do usuário", description = "Atualiza dados do usuário autenticado usando o refresh token em cookie.")
    @ApiResponse(responseCode = "200", description = "Atualização bem-sucedida")
    public ResponseEntity<LoginResponseDTO> update(
            @RequestBody UserRequestDTO request,
            @CookieValue(value = "refreshToken", required = false) String refreshToken
    ) {
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = jwtService.extractUsername(refreshToken);
        User user = ((User) repository.findByEmailAndEnabledIsTrue(username));

        if (!jwtService.isTokenValid(refreshToken, user, Token.REFRESH_TOKEN)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<Necessity> necessities = new ArrayList<>();
        for (Necessity necessity: request.necessities()) {
            try {
                necessities.add(necessityService.getNecessityById(necessity.getNecessityId()));
            } catch (Exception e) {
                e.printStackTrace();
                break;
            }
        }

        user.setFName(request.fName());
        user.setLName(request.lName());
        user.setNecessities(necessities);

        repository.save(user);
        String accessToken = jwtService.generateToken(user, Token.ACCESS_TOKEN);

        return ResponseEntity.ok().body(userMapper.userToLoginResponseDTO(user, accessToken));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Renova access token", description = "Gera um novo access token a partir do refresh token armazenado no cookie.")
    @ApiResponse(responseCode = "200", description = "Access token renovado")
    public ResponseEntity<?> refreshToken(
            @CookieValue(value = "refreshToken", required = false) String refreshToken
    ) {
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = jwtService.extractUsername(refreshToken);
        User user = ((User) repository.findByEmailAndEnabledIsTrue(username));

        if (!jwtService.isTokenValid(refreshToken, user, Token.REFRESH_TOKEN)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String accessToken = jwtService.generateToken(user, Token.ACCESS_TOKEN);
        return ResponseEntity.ok().body(userMapper.userToLoginResponseDTO(user, accessToken));

    }

    @PostMapping("/logout")
    @Operation(summary = "Logout do usuário", description = "Remove o cookie de refresh token e encerra a sessão localmente.")
    @ApiResponse(responseCode = "204", description = "Logout realizado")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        
        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Strict")
                .path("/")
                .maxAge(0) // expires immediately
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());

        return ResponseEntity.noContent().build(); // 204 No Content
}

    @DeleteMapping("/delete")
    @Operation(summary = "Desabilita conta", description = "Desabilita (soft-delete) a conta do usuário autenticado.")
    @ApiResponse(responseCode = "204", description = "Conta desabilitada")
    public ResponseEntity<?> delete(
            @CookieValue(value = "refreshToken", required = false) String refreshToken
    ) {
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String username = jwtService.extractUsername(refreshToken);
        User user = ((User) repository.findByEmailAndEnabledIsTrue(username));

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found or already disabled");
        }

        if (!jwtService.isTokenValid(refreshToken, user, Token.REFRESH_TOKEN)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        user.setEnabled(false);
        repository.save(user);

        return ResponseEntity.noContent().build();
    }


}
