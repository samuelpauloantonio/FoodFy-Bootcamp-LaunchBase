CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int,
  "users_id" int,
  "name" text,
  "ingrediente" text,
  "preparo" text,
  "description" text,
  "quantity" int,
  "status" int,
  "old_price" int,
  "price" int,
  "create_at" timestamp DEFAULT ((now())),
  "update_at" timestamp DEFAULT ((now()))
);

CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "name" text
);

CREATE TABLE "file" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "product_id" int
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");



ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id")


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