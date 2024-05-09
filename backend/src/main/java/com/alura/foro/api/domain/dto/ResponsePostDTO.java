package com.alura.foro.api.domain.dto;

import java.time.ZonedDateTime;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponsePostDTO {

    Long id;
    String title;
    String content;
    ZonedDateTime dateCreated;
    Boolean status;
    ResponseUserDTO author;
    List<ResponseCategoryDTO> categories;
    Integer totalComments;

}
