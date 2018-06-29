\c ot;

-- CREATE TABLE restaurants (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name TEXT,
--   cuisine TEXT,
--   location TEXT,
--   featured boolean
-- );

CREATE TABLE photos2 (
  restaurantid INT references restaurants(id),
  title TEXT,
  caption TEXT,
  source TEXT, 
  url TEXT
);

-- \COPY restaurants (name, cuisine, location, featured) from 'restaurants.txt' (DELIMITER ('|'));
\COPY photos2 (restaurantid, url, title, source, caption) from 'data.txt' (DELIMITER ('|'));

