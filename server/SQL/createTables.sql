CREATE TABLE roles (
  role_id serial PRIMARY KEY,
  role_type character(20)
);

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  name character(20),
  password text,
  role_id integer references roles("role_id"),
  reg_date date not null default now()
);

CREATE TABLE tests (
  test_id serial PRIMARY KEY,
  owner int references users("user_id"),
  title character(50),
  description character(150),
  form_config jsonb,
  creation_date date not null default now()
);

CREATE TABLE comments (
  comment_id serial PRIMARY KEY,
  user_id int references users("user_id"),
  content character(150),
  creation_date date not null default now()
);

CREATE TABLE statuses (
  status_id serial PRIMARY KEY,
  type character(150)
);

CREATE TABLE answers (
  answer_id serial PRIMARY KEY,
  test_id int references tests("test_id"),
  user_id int references users("user_id"),
  form_answers jsonb,
  comment_id int references comments("comment_id"),
  status_id int references statuses("status_id"),
  passage_date date not null default now()
);
