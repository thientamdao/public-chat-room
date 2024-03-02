package com.thientam.publicchatroom.config;

import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.crypto.SecretKey;

@Getter
@ConfigurationProperties(prefix = "app")
public class ApplicationProperties {

    private final Cors cors = new Cors();
    private final Auth auth = new Auth();
    private final OAuth2 oAuth2 = new OAuth2();

    @Getter
    @Setter
    public static class Cors {
        private String[] allowedOrigins;
    }

    @Getter
    @Setter
    public static class Auth {
        private String tokenSecret;
        private Long tokenExpiration;

        public SecretKey getTokenSecret() {
            return Keys.hmacShaKeyFor(tokenSecret.getBytes());
        }
    }

    @Getter
    @Setter
    public static class OAuth2 {
        private String redirectUri;
    }

}
