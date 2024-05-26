# phonebook-node
Node js backend for phonebook

# db query

create database phonebook;

# user table
-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id int8 GENERATED ALWAYS AS IDENTITY NOT NULL,
	first_name varchar NOT NULL,
	last_name varchar NOT NULL,
	mobile_number varchar NOT NULL,
	email varchar NOT NULL,
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	is_active bool DEFAULT false NULL,
	created_ts timestamp DEFAULT now() NOT NULL,
	updated_ts timestamp NULL,
	CONSTRAINT users_email_unique UNIQUE (email),
	CONSTRAINT users_mobile_unique UNIQUE (mobile_number),
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_username_unique UNIQUE (username)
);

# contacts table
CREATE TABLE public.contacts
(
    id bigint NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    mobile_number character varying NOT NULL,
    email character varying,
    address character varying NOT NULL,
    nick_name character varying NOT NULL,
    relationship character varying NOT NULL,
    created_by bigint NOT NULL,
    created_ts timestamp with time zone NOT NULL,
    updated_ts timestamp with time zone,
    PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email),
    CONSTRAINT mobile_unique UNIQUE (mobile_number),
    CONSTRAINT created_by_fk FOREIGN KEY (created_by)
        REFERENCES public.users (id) MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.contacts
    OWNER to postgres;
