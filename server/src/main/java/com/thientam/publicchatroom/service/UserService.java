package com.thientam.publicchatroom.service;

import com.thientam.publicchatroom.entity.User;
import com.thientam.publicchatroom.exception.ApiException;
import com.thientam.publicchatroom.repository.UserRepository;
import com.thientam.publicchatroom.request.UpdateAvatarRequest;
import com.thientam.publicchatroom.request.UpdateEmailRequest;
import com.thientam.publicchatroom.request.UpdateNameRequest;
import com.thientam.publicchatroom.request.UpdatePasswordRequest;
import com.thientam.publicchatroom.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User getUser(UserPrincipal userPrincipal) {
        return userPrincipal.toUser();
    }

    public User updateName(UserPrincipal userPrincipal, UpdateNameRequest request) {
        var user = userPrincipal.toUser();
        user.setName(request.getName());

        return userRepository.save(user);
    }

    public User updateEmail(UserPrincipal userPrincipal, UpdateEmailRequest request) {
        var user = userPrincipal.toUser();
        user.setEmail(request.getEmail());
        user.setVerified(false);

        return userRepository.save(user);
    }

    public User updateAvatar(UserPrincipal userPrincipal, UpdateAvatarRequest request) {
        var user = userPrincipal.toUser();
        var avatarUrl = request.toString();
        user.setAvatarUrl(avatarUrl);

        return userRepository.save(user);
    }

    public User updatePassword(UserPrincipal userPrincipal, UpdatePasswordRequest request) {
        var user = userPrincipal.toUser();

        if (user.getPassword() == null || passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        } else {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Current password is incorrect");
        }

        return userRepository.save(user);
    }

    public void deleteUser(UserPrincipal userPrincipal) {
        var user = userPrincipal.toUser();
        userRepository.deleteById(user.getId());
    }

}
