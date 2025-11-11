package com.unip.EstablishmentsService.users;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/users")
@Tag(name = "Usuários", description = "Endpoints relacionados a usuários e gerenciamento de perfil")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/me/profile-picture")
    @Operation(summary = "Atualiza foto de perfil", description = "Faz upload e atualiza a foto de perfil do usuário autenticado.")
    @ApiResponse(responseCode = "200", description = "Foto de perfil atualizada com sucesso")
    public ResponseEntity<User> uploadProfilePicture(
        @RequestParam("file") MultipartFile file,
        @AuthenticationPrincipal User user
    )
    {
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null ?
                    originalFilename.substring(originalFilename.lastIndexOf("."))
                    : "";

            String newFileName = user.getUserId() + "_profile" + extension;

            String uploadBaseDir = System.getenv().getOrDefault("UPLOAD_DIR/profile-pictures", "uploads/profile-pictures");
            Path uploadDir = Paths.get(uploadBaseDir);
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            Path filePath = uploadDir.resolve(newFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            user.setProfileImage("/uploads/profile-pictures/" + newFileName);
            userRepository.save(user);

            return ResponseEntity.ok().body(user);

        } catch (RuntimeException | IOException e) {
            throw new RuntimeException(e);
        }

    }
}
