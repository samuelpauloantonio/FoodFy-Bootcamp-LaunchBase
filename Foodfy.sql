/* COMANDO PARA O MEU BANCO DE DADOS */

DROP DATABASE  IF EXISTS foodfy
CREATE DATABASE foodfy

CREATE TABLE "receips" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int,
  "chef_id" int,
  "name" text,
  "ingredients" text,
  "prepation" text,
  "information" text,
  "create_at" timestamp DEFAULT ((now())),
  "update_at" timestamp DEFAULT ((now()))
);





CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "name" text
);

INSERT INTO  categories(name) VALUES ('Hambúrgueres');
INSERT INTO  categories(name) VALUES('Pizzas');
INSERT INTO  categories(name) VALUES('Cachorros quente');

INSERT INTO  categories(name) VALUES ('Doces');
INSERT INTO  categories(name) VALUES('Pratos');
INSERT INTO  categories(name) VALUES('Sanduíches');


CREATE TABLE "file" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "product_id" int
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

-- Relacionamento entre as Receitas e o usuario

  ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id")



--CREATE USERS 

CREATE TABLE "user" (
id SERIAL PRIMARY KEY
name TEXT NOT NULL
email TEXT UNIQUE NOT NULL
password TEXT NOT NULL
reset_token TEXT
reset_token_expires TEXT
is_admin BOOLEAN DEFAULT false
created_at TIMESTAMP DEFAULT(now())
updated_at TIMESTAMP DEFAULT(now())

);





/*FUNCTION PROCEDURE E TRIGGERS*/
/*para pegar a data de actualizacao */

CREATE FUNCTION setTime()
returns trigger AS $$
begin 

NEW.update_at = now();

return new;

end;
$$
language plpgsql


create Trigger set_timestamp 
before update on products 

for each Row 

execute procedure setTime()