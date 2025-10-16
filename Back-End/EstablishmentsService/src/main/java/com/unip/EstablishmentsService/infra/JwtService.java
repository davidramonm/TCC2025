package com.unip.EstablishmentsService.infra;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.unip.EstablishmentsService.models.Token;
import com.unip.EstablishmentsService.models.User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@Service
public class JwtService {


    private final String SECRET = "Segredo";
    private final Integer ACCESS_EXPIRATION_TIME = 15;  // 15 minutos
    private final Integer REFRESH_EXPIRATION_TIME = 60 * 24 * 7;  // 7 dias



    public String generateToken(User user, Token token) {
        int time = ACCESS_EXPIRATION_TIME;
        if (token == Token.REFRESH_TOKEN){
            time = REFRESH_EXPIRATION_TIME;
        }
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            return JWT.create()
                    .withIssuer("login-auth-api")
                    .withSubject(user.getEmail())
                    .withExpiresAt(this.generateExpirationDate(time))
                    .sign(algorithm);

        } catch (JWTCreationException exception){
            throw new RuntimeException("Error while authenticating");
        }
    }

    public String validateToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            return JWT.require(algorithm)
                    .withIssuer("login-auth-api")
                    .build()
                    .verify(token)
                    .getSubject();

        } catch (JWTVerificationException exception) {
            return null;
        }
    }

    public String extractUsername(String token) {
        try {
            DecodedJWT decoded = JWT.decode(token);
            return decoded.getSubject();
        } catch (Exception e) {
            return null;
        }
    }
    private Instant generateExpirationDate(Integer time) {
        return LocalDateTime.now().plusMinutes(time).toInstant(ZoneOffset.of("-03:00"));
    }


    public boolean isTokenValid(String token, User user, Token expectedType) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET))
                    .withSubject(user.getEmail())
                    .withIssuer("login-auth-api")
                    .build();

            DecodedJWT decoded = verifier.verify(token);

            return decoded.getExpiresAt().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
