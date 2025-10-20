package com.unip.EstablishmentsService.mappers;

import com.unip.EstablishmentsService.dtos.LoginResponseDTO;
import com.unip.EstablishmentsService.models.User;
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
