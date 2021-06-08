CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE announcements(
  announcement_id UUID NOT NULL PRIMARY KEY,
  user_id VARCHAR(500) NOT NULL REFERENCES users(user_id),
  course_ids VARCHAR(100)[] NOT NULL,
  title VARCHAR(1000) NOT NULL,
  announcement_text TEXT NOT NULL,
  scheduled_time VARCHAR(5) NOT NULL, -- hh:mm
  posting_days VARCHAR(3)[] NOT NULL, -- ex: ['mon', 'wed', 'thu']
  last_posted TIMESTAMP
);