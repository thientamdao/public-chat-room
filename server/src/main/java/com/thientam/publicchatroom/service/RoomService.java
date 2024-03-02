package com.thientam.publicchatroom.service;

import com.thientam.publicchatroom.entity.Room;
import com.thientam.publicchatroom.entity.User;
import com.thientam.publicchatroom.exception.ApiException;
import com.thientam.publicchatroom.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public Room findById(String id) {
        return roomRepository
            .findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Room not found with id=" + id));
    }

    public List<Room> searchRooms(String keywords) {
        List<Room> result = new ArrayList<>();

        if (keywords.isEmpty()) {
            roomRepository.findAll().forEach(result::add);
        } else {
            roomRepository.searchAllByHeadingOrDescription(keywords, keywords).forEach(result::add);
        }

        return result;
    }

    public Room create(Room newRoom, User owner) {
        newRoom.setOwner(owner);
        newRoom.setCreatedAt(new Date());
        newRoom.setMembers(new ArrayList<>());
        return roomRepository.save(newRoom);
    }

    public Room join(String roomId, User newMember) {
        var foundRoom = findById(roomId);

        var members = foundRoom.getMembers();
        if (members.size() == foundRoom.getTotalSlots()) {
            throw new ApiException(HttpStatus.CONFLICT, "This room is full");
        }

        if (members.stream().noneMatch(o -> o.getId().equals(newMember.getId()))) {
            members.add(newMember);
        }
        foundRoom.setMembers(members);
        return roomRepository.save(foundRoom);
    }

    public void leave(String roomId, User member) {
        var foundRoom = findById(roomId);

        var members = foundRoom.getMembers();
        for (int i = 0; i < members.size(); i++) {
            if (members.get(i).getId().equals(member.getId())) {
                members.remove(i);
                break;
            }
        }
        if (members.isEmpty()) {
            roomRepository.deleteById(roomId);
        } else {
            foundRoom.setMembers(members);
            roomRepository.save(foundRoom);
        }
    }

}
