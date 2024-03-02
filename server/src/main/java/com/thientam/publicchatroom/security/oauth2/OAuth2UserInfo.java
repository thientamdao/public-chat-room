package com.thientam.publicchatroom.security.oauth2;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

@Getter
@AllArgsConstructor
public class OAuth2UserInfo {

    private Map<String, Object> attributes;

    public String getId() {
        return attributes.get("sub").toString();
    }

    public String getName() {
        return attributes.get("name").toString();
    }

    public String getEmail() {
        return attributes.get("email").toString();
    }

    public String getAvatarUrl() {
        var url = attributes.get("picture").toString();
        return url.substring(0, url.length() - 6);
    }

}
