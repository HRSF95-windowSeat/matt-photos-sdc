DROP DATABASE IF EXISTS photos;

CREATE DATABASE photos;

\c photos;

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT,
  cuisine TEXT,
  location text,
  featured boolean
);

-- CREATE TABLE photos (
--   id INT PRIMARY KEY NOT NULL,
--   url TEXT
-- );

-- CREATE TABLE restaurantphotos (
--   restaurantid INT,
--   photosid INT,
--   title TEXT,
--   caption TEXT,
--   source TEXT,
--   type TEXT,
--   date TEXT, 
--   height INT,
--   width INT,
-- );

\COPY restaurants (name, cuisine, location, featured) from 'data.txt' (DELIMITER ('|'));