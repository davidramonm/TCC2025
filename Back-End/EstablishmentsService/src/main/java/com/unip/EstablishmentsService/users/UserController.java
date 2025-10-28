package com.unip.EstablishmentsService.users;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Controller
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/me/profile-picture")
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

            String uploadBaseDir = System.getenv().getOrDefault("UPLOAD_DIR", "uploads/profile-pictures");
            Path uploadDir = Paths.get(uploadBaseDir);
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            Path filePath = uploadDir.resolve(newFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            user.setProfileImage("http://localhost:8080/uploads/profile-pictures/" + newFileName);
            userRepository.save(user);

            return ResponseEntity.ok().body(user);

        } catch (RuntimeException | IOException e) {
            throw new RuntimeException(e);
        }

    }
}
