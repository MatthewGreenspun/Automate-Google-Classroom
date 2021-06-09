import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import AnnouncementOutlinedIcon from "@material-ui/icons/AnnouncementOutlined";
import LiveHelpOutlinedIcon from "@material-ui/icons/LiveHelpOutlined";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    newPostButton: {
      textTransform: "none",
      maxWidth: "10em",
      marginLeft: "5px",
    },
    actionIcon: {
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
  setCreatingPostType: React.Dispatch<
    React.SetStateAction<"announcement" | "question" | null>
  >;
  setIsEditingPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostsTopBar: React.FC<Props> = ({
  isCreatingPost,
  setCreatingPostType,
  setIsEditingPost,
}) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const classes = useStyles();

  return (
    <AppBar color="secondary" position="relative" className={classes.appBar}>
      {isCreatingPost ? (
        <ArrowBackIcon
          className={classes.arrowBackIcon}
          onClick={() => {
            setCreatingPostType(null);
            setIsEditingPost(false);
          }}
        />
      ) : (
        <Fab
          color="primary"
          variant="extended"
          className={classes.newPostButton}
          onClick={(e) => {
            setAnchorElement(e.currentTarget);
          }}
        >
          <AddIcon className={classes.actionIcon} /> New Post
        </Fab>
      )}
      <Menu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={() => setAnchorElement(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorElement(null);
            setCreatingPostType("announcement");
          }}
        >
          <AnnouncementOutlinedIcon className={classes.actionIcon} />
          Announcement
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorElement(null);
            setCreatingPostType("question");
          }}
        >
          <LiveHelpOutlinedIcon className={classes.actionIcon} />
          Question
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default PostsTopBar;
