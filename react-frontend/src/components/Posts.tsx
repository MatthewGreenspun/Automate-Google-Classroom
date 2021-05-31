import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Snackbar from "@material-ui/core/Snackbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CreateAnnouncement from "./CreateAnnouncement";
import Announcements from "./Announcements";
import { useQuery } from "react-query";
import axios from "axios";

interface Props {
  user: null | {
    displayName: string;
    profilePictureLink: string;
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    newPostButton: {
      textTransform: "none",
      maxWidth: "10em",
      marginLeft: "5px",
    },
    addIcon: {
      marginRight: "10px",
    },
    appBar: {
      height: "4em",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    arrowBackIcon: {
      marginLeft: "5px",
      cursor: "pointer",
    },
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
    if (!user) setSessionExpired(true);
  }, [user]);
  const { data: courses, isLoading: coursesIsLoading } = useQuery(
    "courses",
    async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/users/courses"
      );
      return data;
    }
  );
  const { data: announcements, isLoading: AnnouncementsIsLoading } = useQuery(
    "announcements",
    async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/users/announcements"
      );
      return data;
    }
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <AppBar color="secondary" position="relative" className={classes.appBar}>
        {isCreatingPost ? (
          <ArrowBackIcon
            className={classes.arrowBackIcon}
            onClick={() => setIsCreatingPost(false)}
          />
        ) : (
          <Fab
            color="primary"
            variant="extended"
            className={classes.newPostButton}
            onClick={() => setIsCreatingPost(true)}
          >
            <AddIcon className={classes.addIcon} /> New Post
          </Fab>
        )}
      </AppBar>
      {isCreatingPost && coursesIsLoading && (
        <LinearProgress color="primary" className={classes.progressIndicator} />
      )}

      {!isCreatingPost &&
        !AnnouncementsIsLoading &&
        announcements &&
        announcements.length > 0 && (
          <Announcements announcements={announcements as Announcement[]} />
        )}

      {isCreatingPost && !coursesIsLoading && courses.length === 0 && (
        <Typography variant="h5" style={{ marginTop: "10px" }}>
          Looks like you don't have any classes on Google Classroom. Try
          Creating one{" "}
          <Link href="https://classroom.google.com" target="_blank">
            here
          </Link>{" "}
          and then come back.
        </Typography>
      )}
      {isCreatingPost && !coursesIsLoading && courses.length > 0 && (
        <CreateAnnouncement
          courses={
            courses as {
              courseId: string;
              courseName: string;
            }[]
          }
        />
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={sessionExpired}
        message={"Session expired. You must sign in again. "}
        action={
          // eslint-disable-next-line no-restricted-globals
          <Button color="primary" onClick={() => location.reload()}>
            Reload
          </Button>
        }
      />
    </Box>
  );
};

export default Posts;
