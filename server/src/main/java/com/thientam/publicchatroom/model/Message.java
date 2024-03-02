package com.thientam.publicchatroom.model;

import com.thientam.publicchatroom.common.Status;
import com.thientam.publicchatroom.entity.User;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {

    private User sender;
    private String roomId;
    private Status status;
    private String value;
    private Date date;

}
