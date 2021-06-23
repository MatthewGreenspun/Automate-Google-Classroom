interface DatabaseUserData {
  user_id?: string;
  refresh_token?: string;
  display_name?: string;
  profile_picture_link?: string;
  email?: string;
}

interface DatabaseAnnouncementData {
  announcement_id?: string;
  user_id?: string;
  course_ids?: string[];
  title?: string;
  announcement_text?: string;
  scheduled_time?: string;
  posting_days?: string[];
  last_posted?: string;
}

interface DatabaseSaQuestion {
  question_id?: string;
  user_id?: string;
  course_ids?: string[];
  topic_id?: string;
  title?: string;
  description?: string;
  posting_days?: string[];
  scheduled_time?: string;
  due_date?: string;
  due_time?: string;
  submission_modifiable?: boolean;
  max_points?: number;
}

interface DatabaseMcQuestion {
  question_id?: string;
  user_id?: string;
  course_ids?: string[];
  topic_id?: string;
  title?: string;
  description?: string;
  posting_days?: string[];
  scheduled_time?: string;
  due_date?: string;
  due_time?: string;
  submission_modifiable?: boolean;
  max_points?: number;
  choices?: string[];
}

interface AnnouncementToPost extends DatabaseAnnouncementData {
  refresh_token: string;
}

interface SaQuestionToPost extends DatabaseSaQuestion {
  refresh_token: string;
}

interface McQuestionToPost extends DatabaseMcQuestion {
  refresh_token: string;
}
