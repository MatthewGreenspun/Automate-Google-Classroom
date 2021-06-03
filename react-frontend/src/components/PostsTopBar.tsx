import AppBar from "@material-ui/core/AppBar";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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

interface Props {
  isCreatingPost: boolean;
  setIsCreatingPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostsTopBar: React.FC<Props> = ({
  isCreatingPost,
  setIsCreatingPost,
}) => {
  const classes = useStyles();

  return (
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
  );
};

export default PostsTopBar;
