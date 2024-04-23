-- create table comment(

--     id bigint not null auto_increment,
--     content varchar(255) not null,
--     date_created datetime not null,
--     user_id bigint not null,
--     post_id bigint not null,

--     primary key(id),

--     constraint fk_comment_user_id foreign key(user_id) references user(id),
--     constraint fk_comment_post_id foreign key(post_id) references post(id)
-- );

CREATE TABLE comment (
    id BIGSERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    date_created TIMESTAMP NOT NULL,
    user_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL,

    CONSTRAINT fk_comment_user_id FOREIGN KEY(user_id) REFERENCES "user"(id),
    CONSTRAINT fk_comment_post_id FOREIGN KEY(post_id) REFERENCES post(id)
);