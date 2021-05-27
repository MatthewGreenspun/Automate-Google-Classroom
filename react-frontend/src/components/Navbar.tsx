import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Link,
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface Props {
  user: null | {
    displayName: string;
    profilePictureLink: string;
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      color: "white",
    },
    profileBox: {
      cursor: "pointer",
    },
    profilePicture: {
      marginLeft: "9px",
    },
  })
);

const Navbar: React.FC<Props> = ({ user }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Link
          variant="h1"
          underline="none"
          href="/"
          color="textPrimary"
          className={classes.title}
        >
          Automate Google Classroom
        </Link>
        {!user && (
          <Button variant="contained" color="primary" href="/auth/login">
            Sign in With Google
          </Button>
        )}
        {user && (
          <>
            <Box
              display="flex"
              alignItems="center"
              border="1px solid white"
              borderRadius={4}
              padding={1}
              onClick={handleClick}
              className={classes.profileBox}
            >
              <Typography>{user.displayName}</Typography>
              <Avatar
                alt="user profile picture"
                src={user.profilePictureLink}
                className={classes.profilePicture}
              />
            </Box>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => (window.location.href = "/posts")}>
                My posts
              </MenuItem>
              <MenuItem onClick={() => (window.location.href = "/auth/logout")}>
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
