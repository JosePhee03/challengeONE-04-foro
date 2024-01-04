create table category(

    id bigint not null auto_increment,
    name varchar(150) not null unique,

    primary key(id)
);