import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface Props {
  user: User | null;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      color: "white",
    },
    profileBox: {
      cursor: "pointer",
      backgroundColor: "#37474f",
    },
    profilePicture: {
      marginLeft: "9px",
    },
    googleLogo: {
      marginRight: "9px",
      height: theme.spacing(4),
      width: theme.spacing(4),
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
          <Button
            variant="contained"
            color="secondary"
            href={`${process.env.REACT_APP_SERVER_URL}/auth/login`}
          >
            <Avatar
              alt="user profile picture"
              src="/google-logo.png"
              className={classes.googleLogo}
            />
            Sign in
          </Button>
        )}
        {user && (
          <>
            <Box
              display="flex"
              alignItems="center"
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
              <MenuItem
                onClick={() =>
                  (window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/logout`)
                }
              >
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
