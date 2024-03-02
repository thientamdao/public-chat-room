package com.thientam.publicchatroom.controller;

import com.thientam.publicchatroom.entity.Room;
import com.thientam.publicchatroom.security.CurrentUser;
import com.thientam.publicchatroom.security.UserPrincipal;
import com.thientam.publicchatroom.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/rooms")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public List<Room> findAll(@RequestParam String k) {
        return roomService.searchRooms(k);
    }

    @PostMapping("/room")
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public Room create(@CurrentUser UserPrincipal userPrincipal, @RequestBody Room newRoom) {
        return roomService.create(newRoom, userPrincipal.toUser());
    }

    @PutMapping("/room/join")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public Room join(@CurrentUser UserPrincipal userPrincipal, @RequestParam String roomId) {
        return roomService.join(roomId, userPrincipal.toUser());
    }

    @PutMapping("/room/leave")
    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    public void leave(@CurrentUser UserPrincipal userPrincipal, @RequestParam String roomId) {
        roomService.leave(roomId, userPrincipal.toUser());
    }

    @MessageMapping("/room")
    @SendTo("/room/public")
    public List<Room> notifyNewRoom() {
        return roomService.searchRooms("");
    }

}
