package com.unip.EstablishmentsService.controllers;


import com.unip.EstablishmentsService.dtos.LoginRequestDTO;
import com.unip.EstablishmentsService.dtos.LoginResponseDTO;
import com.unip.EstablishmentsService.dtos.RegisterRequestDTO;
import com.unip.EstablishmentsService.infra.JwtService;
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


    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody @Valid LoginRequestDTO request,
            HttpServletResponse response
    ){

        var usernamePassword = new UsernamePasswordAuthenticationToken(request.email(), request.password());
        var auth = authenticationManager.authenticate(usernamePassword);

        String accessToken = jwtService.generateToken((User) auth.getPrincipal(), Token.ACCESS_TOKEN);
        String refreshToken = jwtService.generateToken((User) auth.getPrincipal(), Token.REFRESH_TOKEN);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().body(new LoginResponseDTO(accessToken));
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

        return ResponseEntity.ok().body(new LoginResponseDTO(accessToken));
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

        String acessToken = jwtService.generateToken(user, Token.ACCESS_TOKEN);
        return ResponseEntity.ok().body(new LoginResponseDTO(acessToken));

    }


}
