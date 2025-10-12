package com.unip.EstablishmentsService.controllers;


import com.unip.EstablishmentsService.dtos.LoginRequestDTO;
import com.unip.EstablishmentsService.dtos.LoginResponseDTO;
import com.unip.EstablishmentsService.dtos.RegisterRequestDTO;
import com.unip.EstablishmentsService.infra.JwtService;
import com.unip.EstablishmentsService.models.Role;
import com.unip.EstablishmentsService.models.User;
import com.unip.EstablishmentsService.repositories.UserRepository;
import com.unip.EstablishmentsService.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO request){

        var usernamePassword = new UsernamePasswordAuthenticationToken(request.email(), request.password());
        var auth = authenticationManager.authenticate(usernamePassword);

        var token = jwtService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok().body(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> register(@RequestBody @Valid RegisterRequestDTO request){

        var user = User.builder()
                .email(request.email())
                .fName(request.fName())
                .lName(request.lName())
                .password(new BCryptPasswordEncoder().encode(request.password()))
                .role(Role.ROLE_USER)
                .build();

        repository.save(user);
        var token = jwtService.generateToken(user);

        return ResponseEntity.ok().body(new LoginResponseDTO(token));
    }


}
