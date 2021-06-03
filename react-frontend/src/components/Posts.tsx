import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PostsTopBar from "./PostsTopBar";
import CreateAnnouncement from "./CreateAnnouncement";
import Announcements from "./Announcements";
import SessionExpiredAlert from "./SessionExpiredAlert";
import { useQuery } from "react-query";
import axios from "axios";

interface Props {
  user: User | null;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progressIndicator: {
      height: "5px",
      width: "100%",
    },
  })
);

const Posts: React.FC<Props> = ({ user }) => {
  const classes = useStyles();

  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (user) setSessionExpired(false);
    else if (!user) setSessionExpired(true);
  }, [user]);

  const { data: courses, isLoading: coursesIsLoading } = useQuery<Course[]>(
    "courses",
    async (): Promise<Course[]> => {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/users/courses"
      );
      return data;
    }
  );
  const {
    data: announcements,
    isLoading: AnnouncementsIsLoading,
    refetch: refetchAnnouncements,
  } = useQuery<Announcement[]>("announcements", async (): Promise<
    Announcement[]
  > => {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/users/announcements"
    );
    return data;
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <PostsTopBar
        isCreatingPost={isCreatingPost}
        setIsCreatingPost={setIsCreatingPost}
      />

      {isCreatingPost && coursesIsLoading && (
        <LinearProgress color="primary" className={classes.progressIndicator} />
      )}

      {!isCreatingPost &&
        !AnnouncementsIsLoading &&
        announcements &&
        announcements.length > 0 && (
          <Announcements
            announcements={announcements}
            refetchAnnouncements={refetchAnnouncements}
          />
        )}

      {isCreatingPost && !coursesIsLoading && courses && courses.length === 0 && (
        <Typography variant="h5" style={{ marginTop: "10px" }}>
          Looks like you don't have any classes on Google Classroom. Try
          Creating one{" "}
          <Link href="https://classroom.google.com" target="_blank">
            here
          </Link>{" "}
          and then come back.
        </Typography>
      )}
      {isCreatingPost && !coursesIsLoading && courses && courses.length > 0 && (
        <CreateAnnouncement
          refetchAnnouncements={refetchAnnouncements}
          setIsCreatingPost={setIsCreatingPost}
          courses={courses}
        />
      )}

      <SessionExpiredAlert sessionExpired={sessionExpired} />
    </Box>
  );
};

export default Posts;
