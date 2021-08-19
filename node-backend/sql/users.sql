CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  user_id VARCHAR(500) NOT NULL UNIQUE,
  refresh_token VARCHAR(500) NOT NULL,
  display_name VARCHAR(1000),
  profile_picture_link VARCHAR(1000),
  email VARCHAR(1000)
);
