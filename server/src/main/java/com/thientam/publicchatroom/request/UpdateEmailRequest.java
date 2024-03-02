package com.thientam.publicchatroom.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateEmailRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Email is not valid")
    private String email;

}
