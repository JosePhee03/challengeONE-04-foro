package com.alura.foro.api.domain.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponsePostDTO {

    Long id;
    String title;
    String content;
    LocalDateTime dateCreated;
    Boolean status;
    ResponseUserDTO user;
    List<ResponseCategoryDTO> categories;
    Integer totalComments;

}
