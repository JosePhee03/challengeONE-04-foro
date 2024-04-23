-- create table user(

--     id bigint not null auto_increment,
--     username varchar(150) not null unique,
--     password varchar(255) not null,
--     role ENUM('USER', 'ADMIN') not null,
--     image varchar(255),

--     primary key(id)

-- );

CREATE TABLE "user" (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('USER', 'ADMIN')),
    image VARCHAR(255)
);