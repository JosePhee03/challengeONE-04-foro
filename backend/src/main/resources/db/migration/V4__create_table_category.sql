-- create table category(

--     id bigint not null auto_increment,
--     name varchar(150) not null unique,

--     primary key(id)
-- );

CREATE TABLE category (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE
);