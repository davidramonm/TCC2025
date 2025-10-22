package com.unip.EstablishmentsService.users;

import com.unip.EstablishmentsService.users.dtos.LoginResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public LoginResponseDTO userToLoginResponseDTO(User user, String sessionToken) {
        return new LoginResponseDTO(
                user.getUserId(),
                user.getFName(),
                user.getLName(),
                user.getEmail(),
                user.getNecessities(),
                sessionToken
        );
    }
}
