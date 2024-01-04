create table comment(

    id bigint not null auto_increment,
    content varchar(255) not null,
    date_created datetime not null,
    user_id bigint not null,
    post_id bigint not null,

    primary key(id),

    constraint fk_comment_user_id foreign key(user_id) references user(id),
    constraint fk_comment_post_id foreign key(post_id) references post(id)
);