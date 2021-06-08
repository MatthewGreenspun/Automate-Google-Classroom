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

interface Question {
  questionId?: string;
  userId?: string;
  courseIds?: string[];
  topicId?: string[];
  title?: string;
  description?: string;
  postingDays?: string[];
  scheduledTime?: string;
  dueDate?: string;
  dueTime?: string;
  submissionModifiable?: boolean;
  maxPoints?: number;
  choices?: string[];
}

interface User {
  displayName: string;
  profilePictureLink: string;
}

interface Course {
  courseId: string;
  courseName: string;
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
