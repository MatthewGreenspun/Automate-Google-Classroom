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
