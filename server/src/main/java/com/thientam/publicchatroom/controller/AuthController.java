package com.thientam.publicchatroom.controller;

import com.thientam.publicchatroom.entity.User;
import com.thientam.publicchatroom.request.LogInRequest;
import com.thientam.publicchatroom.request.SignUpRequest;
import com.thientam.publicchatroom.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public User signUp(@Valid @RequestBody SignUpRequest request) {
        return authService.signUp(request);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public String logIn(@Valid @RequestBody LogInRequest request) {
        return authService.logIn(request);
    }

}
