import { AppBar, Toolbar, Button } from "@material-ui/core";

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <h1 style={{ flexGrow: 1 }}>Automate Google Classroom</h1>
        <Button variant="contained" color="secondary" href="/login">
          Sign in With Google
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
