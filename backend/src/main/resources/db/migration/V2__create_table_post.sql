create table post(

    id bigint not null auto_increment,
    title varchar(150) not null,
    content varchar(225) not null,
    date_created datetime not null,
    status bit not null,
    user_id bigint not null,

    primary key(id),

    constraint fk_post_user_id foreign key(user_id) references user(id)

);