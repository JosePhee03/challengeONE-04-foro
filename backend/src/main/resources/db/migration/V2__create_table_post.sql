-- create table post(

--     id bigint not null auto_increment,
--     title varchar(150) not null,
--     content varchar(225) not null,
--     date_created datetime not null,
--     status bit not null,
--     user_id bigint not null,

--     primary key(id),

--     constraint fk_post_user_id foreign key(user_id) references user(id)

-- );

CREATE TABLE post (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    content VARCHAR(225) NOT NULL,
    date_created TIMESTAMP NOT NULL,
    status BOOLEAN NOT NULL,
    user_id BIGINT NOT NULL,

    CONSTRAINT fk_post_user_id FOREIGN KEY(user_id) REFERENCES "user"(id)
);