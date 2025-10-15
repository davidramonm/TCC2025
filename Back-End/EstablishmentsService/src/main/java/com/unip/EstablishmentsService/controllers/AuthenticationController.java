package com.unip.EstablishmentsService.controllers;


import com.unip.EstablishmentsService.dtos.LoginRequestDTO;
import com.unip.EstablishmentsService.dtos.LoginResponseDTO;
import com.unip.EstablishmentsService.dtos.RegisterRequestDTO;
import com.unip.EstablishmentsService.infra.JwtService;
import com.unip.EstablishmentsService.mappers.UserMapper;
import com.unip.EstablishmentsService.models.Role;
import com.unip.EstablishmentsService.models.Token;
import com.unip.EstablishmentsService.models.User;
import com.unip.EstablishmentsService.repositories.UserRepository;
import com.unip.EstablishmentsService.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
@SecurityRequirement(name = "bearerToken")
public class AuthenticationController {

    private final UserService service;
    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;


    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody @Valid LoginRequestDTO request,
            HttpServletResponse response
    ){

        var usernamePassword = new UsernamePasswordAuthenticationToken(request.email(), request.password());
        var auth = authenticationManager.authenticate(usernamePassword);
        User user = (User) auth.getPrincipal();
        String accessToken = jwtService.generateToken(user, Token.ACCESS_TOKEN);
        String refreshToken = jwtService.generateToken(user, Token.REFRESH_TOKEN);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().body(userMapper.userToLoginResponseDTO(user, accessToken));
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> register(
            @RequestBody @Valid RegisterRequestDTO request,
            HttpServletResponse response
    ){

        User user = User.builder()
                .email(request.email())
                .fName(request.fName())
                .lName(request.lName())
                .password(new BCryptPasswordEncoder().encode(request.password()))
                .role(Role.ROLE_USER)
                .build();

        repository.save(user);

        String accessToken = jwtService.generateToken(user, Token.ACCESS_TOKEN);
        String refreshToken = jwtService.generateToken(user, Token.REFRESH_TOKEN);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().body(userMapper.userToLoginResponseDTO(user, accessToken));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(
            @CookieValue(value = "refreshToken", required = false) String refreshToken
    ) {
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = jwtService.extractUsername(refreshToken);
        User user = ((User) repository.findByEmail(username));

        if (!jwtService.isTokenValid(refreshToken, user, Token.REFRESH_TOKEN)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String accessToken = jwtService.generateToken(user, Token.ACCESS_TOKEN);
        return ResponseEntity.ok().body(userMapper.userToLoginResponseDTO(user, accessToken));

    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        
        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(0) // expires immediately
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());

        return ResponseEntity.noContent().build(); // 204 No Content
}


}
