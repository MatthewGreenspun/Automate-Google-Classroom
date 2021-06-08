CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE short_answer_questions(
  sa_question_id UUID NOT NULL PRIMARY KEY,
  user_id VARCHAR(500) NOT NULL REFERENCES users(user_id),
  course_ids VARCHAR(100)[] NOT NULL,
  topic_id VARCHAR(100),
  title VARCHAR(1000) NOT NULL,
  description TEXT,
  scheduled_time VARCHAR(5) NOT NULL, -- hh:mm
  posting_days VARCHAR(3)[] NOT NULL, -- ex: ['mon', 'wed', 'thu']
  last_posted TIMESTAMP,
  due_date VARCHAR(10), -- yyyy-mm-dd or "DAY-POSTED"
  due_time VARCHAR(5), -- hh:mm
  submission_modifiable BOOLEAN,
  max_points SMALLINT
);