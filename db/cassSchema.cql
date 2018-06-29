CREATE TABLE if not exists restaurant (
  uuid uuid,
  id INT,
  url TEXT,
  title TEXT,
  user TEXT,
  caption TEXT,
  source TEXT,
  cuisine TEXT,
  location TEXT,
  featured boolean,
  PRIMARY KEY (id, user)
);

COPY restaurant (uuid, id, url, title, user, caption, source, cuisine, location, featured) FROM '~/SDC/vincent-photos/cass.txt' WITH DELIMITER = '|' and header = false;

1000000, 'DarlingDragon', 'Quis at debitis quasi explicabo suscipit nobis sapiente', 'Italian', 'True', 'Chula Vista', 'Ball Lightning', 'unleavened', 'https://s3-us-west-1.amazonaws.com/sdcot/photos/pic_548.jpg', 52a8cc42-d814-4471-b33d-9adebd074dff