package com.thientam.publicchatroom.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.thientam.publicchatroom.common.Status;
import com.thientam.publicchatroom.model.Message;
import com.thientam.publicchatroom.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final RoomService roomService;

    @MessageMapping("/message")
    public Message create(@Payload Message message) throws JsonProcessingException {
        message.setDate(new Date());

        if (message.getStatus() == Status.JOIN || message.getStatus() == Status.LEAVE) {
            var foundRoom = roomService.findById(message.getRoomId());
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            message.setValue(ow.writeValueAsString(foundRoom));
        }

        simpMessagingTemplate.convertAndSendToUser(message.getRoomId(), "/public", message);
        return message;
    }

}
