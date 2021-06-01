import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Posts from "./Posts";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box, ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { useQuery } from "react-query";
import axios from "axios";

function App() {
  const theme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 770,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: {
      primary: {
        light: "#80b4ff",
        main: "#4285f4",
        dark: "#0059c1",
        contrastText: "#fff",
      },
      secondary: {
        light: "#62727b",
        main: "#37474f",
        dark: "#102027",
        contrastText: "#fff",
      },
    },
  });
  theme.typography.h1 = {
    fontSize: "1rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "2.5rem",
    },
    color: "#fff",
  };
  theme.typography.body1 = {
    fontSize: "1rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.2rem",
    },
  };

  const { data, isLoading } = useQuery<{ user: User | null }>(
    "user",
    async (): Promise<{ user: User | null }> => {
      const { data } = await axios.get("http://localhost:8080/api/v1/users/me");
      return data;
    }
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Box
          id="app"
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Navbar user={isLoading || !data ? null : data.user} />
          <Switch>
            <Route path="/login">
              <h1>failure to log in</h1>
            </Route>
            <Route path="/posts">
              <Posts
                user={
                  isLoading || !data
                    ? null
                    : (data.user as unknown as {
                        displayName: string;
                        profilePictureLink: string;
                      } | null)
                }
              />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
