create table users
(
    id   varchar(64)
        constraint users_pk
            primary key,
    name varchar(32) not null
);

create table records
(
    id           serial
        constraint records_pk
            primary key,
    owned_by     varchar(64) not null
        references users (id),
    played_at    date        not null,
    sgf_text     text        not null
);

create index idx_owned_by on records(owned_by);
create index idx_played_at on records(played_at);
