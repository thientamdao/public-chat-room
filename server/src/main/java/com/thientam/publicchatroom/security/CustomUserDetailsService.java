package com.thientam.publicchatroom.security;

import com.thientam.publicchatroom.exception.ApiException;
import com.thientam.publicchatroom.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        var foundUser = userRepository
            .findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        return new UserPrincipal(foundUser);
    }

    public UserDetails loadUserById(Long id) {
        var foundUser = userRepository
            .findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found with id=" + id));

        return new UserPrincipal(foundUser);
    }

}
