# phonebook-node
Node js backend for phonebook

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

