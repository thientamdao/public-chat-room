package com.thientam.publicchatroom.security;

import com.thientam.publicchatroom.config.ApplicationProperties;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenProvider {

    private final ApplicationProperties applicationProperties;

    public String createToken(Authentication authentication) {
        var user = (UserPrincipal) authentication.getPrincipal();

        var subject = user.getId().toString();
        var now = new Date();
        var exp = new Date(now.getTime() + applicationProperties.getAuth().getTokenExpiration());

        return Jwts.builder()
            .subject(subject)
            .issuedAt(now)
            .expiration(exp)
            .signWith(applicationProperties.getAuth().getTokenSecret())
            .compact();
    }

    public String getSubject(String jwt) {
        return Jwts.parser()
            .verifyWith(applicationProperties.getAuth().getTokenSecret())
            .build()
            .parseSignedClaims(jwt)
            .getPayload()
            .getSubject();
    }

}
