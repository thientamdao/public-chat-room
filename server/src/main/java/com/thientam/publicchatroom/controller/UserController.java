package com.thientam.publicchatroom.controller;

import com.thientam.publicchatroom.entity.User;
import com.thientam.publicchatroom.request.UpdateAvatarRequest;
import com.thientam.publicchatroom.request.UpdateEmailRequest;
import com.thientam.publicchatroom.request.UpdateNameRequest;
import com.thientam.publicchatroom.request.UpdatePasswordRequest;
import com.thientam.publicchatroom.security.CurrentUser;
import com.thientam.publicchatroom.security.UserPrincipal;
import com.thientam.publicchatroom.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public User getUser(@CurrentUser UserPrincipal userPrincipal) {
        return userService.getUser(userPrincipal);
    }

    @PatchMapping("/name")
    @ResponseStatus(HttpStatus.OK)
    public User updateName(
        @CurrentUser UserPrincipal userPrincipal,
        @Valid @RequestBody UpdateNameRequest request
    ) {
        return userService.updateName(userPrincipal, request);
    }

    @PatchMapping("/email")
    @ResponseStatus(HttpStatus.OK)
    public User updateEmail(
        @CurrentUser UserPrincipal userPrincipal,
        @Valid @RequestBody UpdateEmailRequest request
    ) {
        return userService.updateEmail(userPrincipal, request);
    }

    @PatchMapping("/avatar")
    @ResponseStatus(HttpStatus.OK)
    public User updateAvatar(
        @CurrentUser UserPrincipal userPrincipal,
        @Valid @RequestBody UpdateAvatarRequest request
    ) {
        return userService.updateAvatar(userPrincipal, request);
    }

    @PatchMapping("/password")
    @ResponseStatus(HttpStatus.OK)
    public User updatePassword(
        @CurrentUser UserPrincipal userPrincipal,
        @Valid @RequestBody UpdatePasswordRequest request
    ) {
        return userService.updatePassword(userPrincipal, request);
    }

    @DeleteMapping()
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@CurrentUser UserPrincipal userPrincipal) {
        userService.deleteUser(userPrincipal);
    }

}
