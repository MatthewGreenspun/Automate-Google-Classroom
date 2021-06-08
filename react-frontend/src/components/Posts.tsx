import { useState, useEffect, createContext } from "react";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PostsTopBar from "./PostsTopBar";
import CreateAnnouncement from "./CreateAnnouncement";
import CreateQuestion from "./CreateQuestion";
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

export const EditingContext =
  createContext<React.Dispatch<React.SetStateAction<string | null>> | null>(
    null
  );

const Posts: React.FC<Props> = ({ user }) => {
  const classes = useStyles();

  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (user) setSessionExpired(false);
    else if (!user) setSessionExpired(true);
  }, [user]);
  useEffect(() => {
    if (editingPostId) setIsEditingPost(true);
    else if (!editingPostId) setIsEditingPost(false);
  }, [editingPostId]);

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
  const {
    data: questions,
    isLoading: questionsIsLoading,
    refetch: refetchQuestions,
  } = useQuery<Question[]>("announcements", async (): Promise<Question[]> => {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/users/questions"
    );
    return data;
  });

  return (
    <EditingContext.Provider value={setEditingPostId}>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <PostsTopBar
          isCreatingPost={isCreatingPost || isEditingPost}
          setIsCreatingPost={setIsCreatingPost}
          setIsEditingPost={setIsEditingPost}
        />

        {isCreatingPost && coursesIsLoading && (
          <LinearProgress
            color="primary"
            className={classes.progressIndicator}
          />
        )}

        {!(isCreatingPost || isEditingPost) &&
          !AnnouncementsIsLoading &&
          announcements &&
          announcements.length > 0 && (
            <Announcements
              announcements={announcements}
              refetchAnnouncements={refetchAnnouncements}
            />
          )}

        {isCreatingPost &&
          !coursesIsLoading &&
          courses &&
          courses.length === 0 && (
            <Typography variant="h5" style={{ marginTop: "10px" }}>
              Looks like you don't have any classes on Google Classroom. Try
              Creating one{" "}
              <Link href="https://classroom.google.com" target="_blank">
                here
              </Link>{" "}
              and then come back.
            </Typography>
          )}
        {(isCreatingPost || isEditingPost) &&
          !coursesIsLoading &&
          courses &&
          courses.length > 0 && (
            <CreateAnnouncement
              refetchAnnouncements={refetchAnnouncements}
              setIsCreatingPost={setIsCreatingPost}
              isEditing={isEditingPost}
              setEditingPostId={setEditingPostId}
              courses={courses}
              editingAnnouncement={
                isEditingPost
                  ? announcements?.filter(
                      ({ announcementId }) => announcementId === editingPostId
                    )[0]
                  : undefined
              }
            />
          )}

        <SessionExpiredAlert sessionExpired={sessionExpired} />
      </Box>
    </EditingContext.Provider>
  );
};

export default Posts;
