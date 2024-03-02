package com.thientam.publicchatroom.security.oauth2;

import com.thientam.publicchatroom.config.ApplicationProperties;
import com.thientam.publicchatroom.security.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;
    private final ApplicationProperties applicationProperties;

    @Override
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication
    ) throws IOException {
        String token = tokenProvider.createToken(authentication);

        String targetUrl = UriComponentsBuilder
            .fromUriString(applicationProperties.getOAuth2().getRedirectUri())
            .queryParam("accessToken", token)
            .build().toUriString();

        super.clearAuthenticationAttributes(request);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

}
