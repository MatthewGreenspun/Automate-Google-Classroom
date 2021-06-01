interface Announcement {
  announcementId?: string;
  userId?: string;
  courseIds?: string[];
  title?: string;
  announcementText?: string;
  scheduledTime?: string;
  postingDays?: string[];
  lastPosted?: string;
}

type WeekDay =
  | "Sun"
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat"
  | "sun"
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat";
