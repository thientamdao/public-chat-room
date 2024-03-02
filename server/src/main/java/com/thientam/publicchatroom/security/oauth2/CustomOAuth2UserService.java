package com.thientam.publicchatroom.security.oauth2;

import com.thientam.publicchatroom.entity.User;
import com.thientam.publicchatroom.exception.ApiException;
import com.thientam.publicchatroom.repository.UserRepository;
import com.thientam.publicchatroom.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        var oAuth2User = super.loadUser(userRequest);
        var oAuth2UserInfo = new OAuth2UserInfo(oAuth2User.getAttributes());

        if (oAuth2UserInfo.getEmail().isEmpty()) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Email not found from OAuth2 Provider");
        }

        var foundUser = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        var user = foundUser.orElseGet(() -> registerNewUser(oAuth2UserInfo));

        return new UserPrincipal(user);
    }

    private User registerNewUser(OAuth2UserInfo oAuth2UserInfo) {
        var user = User.builder()
            .name(oAuth2UserInfo.getName())
            .email(oAuth2UserInfo.getEmail())
            .isVerified(true)
            .avatarUrl(oAuth2UserInfo.getAvatarUrl())
            .build();
        return userRepository.save(user);
    }

}
