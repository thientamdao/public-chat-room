package com.thientam.publicchatroom.repository;

import com.thientam.publicchatroom.entity.Room;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.Optional;

public interface RoomRepository extends ElasticsearchRepository<Room, String> {

    Iterable<Room> searchAllByHeadingOrDescription(String heading, String description);

}
