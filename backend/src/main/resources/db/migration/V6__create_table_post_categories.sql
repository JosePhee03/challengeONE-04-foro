create table post_categories (

    post_id bigint not null,
    category_id bigint not null,

    constraint fk_post_categories_post_id foreign key(post_id) references post(id),
    constraint fk_post_categories_category_id foreign key(category_id) references category(id)

);