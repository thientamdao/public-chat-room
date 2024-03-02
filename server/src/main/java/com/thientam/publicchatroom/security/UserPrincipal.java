package com.thientam.publicchatroom.security;

import com.thientam.publicchatroom.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPrincipal implements OAuth2User, UserDetails {

    private Long id;
    private String name;
    private String email;
    private boolean isVerified;
    private String avatarUrl;
    private String password;
    private Map<String, Object> attributes;

    public UserPrincipal(User user) {
        id = user.getId();
        name = user.getName();
        email = user.getEmail();
        isVerified = user.isVerified();
        avatarUrl = user.getAvatarUrl();
        password = user.getPassword();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(isVerified ? "USER" : "GUEST"));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public User toUser() {
        return User.builder()
            .id(this.id)
            .name(this.name)
            .email(this.email)
            .isVerified(this.isVerified)
            .avatarUrl(this.avatarUrl)
            .password(this.password)
            .build();
    }

}
