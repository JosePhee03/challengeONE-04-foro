create table user(

    id bigint not null auto_increment,
    username varchar(150) not null,
    password varchar(255) not null,
    role ENUM('USER', 'ADMIN') not null,
    image varchar(255),

    primary key(id)

);