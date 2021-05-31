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
