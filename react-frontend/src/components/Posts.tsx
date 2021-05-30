import { useState } from "react";
import {
  Box,
  AppBar,
  Fab,
  LinearProgress,
  Typography,
  Link,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CreateAnnouncement from "./CreateAnnouncement";
import { useQuery, QueryClientProvider, QueryClient } from "react-query";
import axios from "axios";

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

const Posts: React.FC = () => {
  const classes = useStyles();

  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const { data, isLoading } = useQuery("courses", async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/users/courses"
    );
    return data;
  });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <AppBar
          color="secondary"
          position="relative"
          className={classes.appBar}
        >
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
        {isCreatingPost && isLoading && (
          <LinearProgress
            color="primary"
            className={classes.progressIndicator}
          />
        )}
        {isCreatingPost && !isLoading && data.length === 0 && (
          <Typography variant="h5" style={{ marginTop: "10px" }}>
            Looks like you don't have any classes on Google Classroom. Try
            Creating one{" "}
            <Link href="https://classroom.google.com" target="_blank">
              here
            </Link>{" "}
            and then come back.
          </Typography>
        )}
        {isCreatingPost && !isLoading && data.length > 0 && (
          <CreateAnnouncement
            courses={
              data as {
                courseId: string;
                courseName: string;
              }[]
            }
          />
        )}
      </Box>
    </QueryClientProvider>
  );
};

export default Posts;
