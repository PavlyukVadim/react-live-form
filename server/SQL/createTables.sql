-- Create table

CREATE TABLE roles (
  role_id serial PRIMARY KEY,
  role_type character(20)
);

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  name character(20),
  password text,
  role_id integer references roles("role_id"),
  reg_date timestamp not null default now()
);

CREATE TABLE tests (
  test_id serial PRIMARY KEY,
  owner int references users("user_id"),
  title character(50),
  description character(150),
  form_config jsonb,
  creation_date timestamp not null default now()
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
  status_id int references statuses("status_id"),
  passage_date timestamp not null default now()
);

CREATE TABLE comments (
  comment_id serial PRIMARY KEY,
  answer_id int references answers("answer_id"),
  user_id int references users("user_id"),
  content character(150),
  creation_date timestamp not null default now()
);

----------------------------------------------------

-- fill table
-- add roles
 INSERT INTO roles (role_type)
 VALUES
  ('USER'),
  ('ADMIN');

-- add users
INSERT INTO users (name, password, role_id)
VALUES
  ('user1', md5(random()::text), 1),
  ('user2', md5(random()::text), 1),
  ('user3', md5(random()::text), 1),
  ('user4', md5(random()::text), 1),
  ('user5', md5(random()::text), 1);

-- add first admin
INSERT INTO users (name, password, role_id)
VALUES
  ('admin1', md5(random()::text), 2);

--add first test
INSERT INTO tests (owner, title, description, form_config)
VALUES
  (6, 'insurance total sum', 'count insurance total sum', '[
      {
        "name": "insurance_sum",
        "fieldType": "input",
        "dataType": "int", "title": "Intut ins. sum:", "defaultValue": 0
      },
      { 
        "name": "add_sum",
        "fieldType": "input",
        "dataType": "int",
        "title": "Input add. sum:",
        "defaultValue": 0
      },
      { 
        "name": "total_sum",
        "fieldType": "input",
        "dataType": "int",
        "title": "Input tot. sum",
        "defaultValue": 0,
        "state": {
          "value": "insurance_sum + add_sum"
        }
      }
    ]'::jsonb);

-- add statuses
INSERT INTO statuses (type)
VALUES
  ('passed'),
  ('assessed');

-- add answers
INSERT INTO answers (test_id, user_id, form_answers, status_id)
VALUES
  (1, 1, '{"insurance_sum":{"value":"100"},"add_sum":{"value":0},"total_sum":{"value":0}}'::jsonb, 1),
  (1, 2, '{"insurance_sum":{"value":"200"},"add_sum":{"value":100},"total_sum":{"value":0}}'::jsonb, 2);

-- add comments
INSERT INTO comments (answer_id, user_id, content)
VALUES
  (2, 6, 'Ok!');
