CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE announcements(
  announcement_id UUID NOT NULL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user(user_id),
  course_ids VARCHAR(100)[] NOT NULL,
  title VARCHAR(1000) NOT NULL,
  announcement_text TEXT NOT NULL,
  scheduled_time VARCHAR(5), -- hh:mm
  posting_days VARCHAR(3)[] NOT NULL -- ex: ['mon', 'wed', 'thu']
);