package com.thientam.publicchatroom.request;

import jakarta.validation.constraints.NotBlank;

import java.io.File;

public class UpdateAvatarRequest {

    @NotBlank(message = "Avatar is required")
    private File avatar;

}
