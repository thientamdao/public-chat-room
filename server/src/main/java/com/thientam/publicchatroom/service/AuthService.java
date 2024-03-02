package com.thientam.publicchatroom.service;

import com.thientam.publicchatroom.entity.User;
import com.thientam.publicchatroom.exception.ApiException;
import com.thientam.publicchatroom.repository.UserRepository;
import com.thientam.publicchatroom.request.LogInRequest;
import com.thientam.publicchatroom.request.SignUpRequest;
import com.thientam.publicchatroom.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    public User signUp(SignUpRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException(HttpStatus.CONFLICT, "Email has been registered");
        }

        var user = User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .isVerified(false)
            .password(passwordEncoder.encode(request.getPassword()))
            .build();

        return userRepository.save(user);
    }

    public String logIn(LogInRequest request) {
        var authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        return tokenProvider.createToken(authentication);
    }

}
