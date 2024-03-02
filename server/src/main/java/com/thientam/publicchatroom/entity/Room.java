package com.thientam.publicchatroom.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.Date;
import java.util.List;

@Document(indexName = "room-index")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Room {

    @Id
    private String id;

    private User owner;

    private Date createdAt;

    private List<User> members;

    private Integer totalSlots;

    private String heading;

    private String description;

    private List<String> languages;

    private List<String> topics;

}
