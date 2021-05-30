import { useState } from "react";
import { Box, AppBar, Fab } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CreateAnnouncement from "./CreateAnnouncement";

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
  })
);

const Posts: React.FC = () => {
  const classes = useStyles();

  const [isCreatingPost, setIsCreatingPost] = useState(false);

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

      {isCreatingPost && (
        <CreateAnnouncement
          courses={[
            { courseId: "23432124", courseName: "Global History P1" },
            { courseId: "2342379", courseName: "Global History P5" },
          ]}
        />
      )}
    </Box>
  );
};

export default Posts;
