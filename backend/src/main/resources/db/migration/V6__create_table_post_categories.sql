-- create table post_categories (

--     post_id bigint not null,
--     category_id bigint not null,

--     constraint fk_post_categories_post_id foreign key(post_id) references post(id),
--     constraint fk_post_categories_category_id foreign key(category_id) references category(id)

-- );

CREATE TABLE post_categories (
    post_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,

    CONSTRAINT fk_post_categories_post_id FOREIGN KEY (post_id) REFERENCES post (id),
    CONSTRAINT fk_post_categories_category_id FOREIGN KEY (category_id) REFERENCES category (id)
);