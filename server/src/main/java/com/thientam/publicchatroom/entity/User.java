package com.thientam.publicchatroom.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thientam.publicchatroom.util.TrimStringConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    @Convert(converter = TrimStringConverter.class)
    private String name;

    @Column(nullable = false, unique = true)
    @Email
    @ToString.Exclude
    private String email;

    @Column(nullable = false)
    @ToString.Exclude
    private boolean isVerified;

    private String avatarUrl;

    @JsonIgnore
    @ToString.Exclude
    private String password;

}
