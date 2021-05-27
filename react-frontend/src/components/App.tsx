import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Posts from "./Posts";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box, ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
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
        light: "#4285f4",
        main: "#4285f4",
        dark: "#0059c1",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ffc046",
        main: "#ff8f00",
        dark: "#c56000",
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

  const { data, isLoading } = useQuery("user", async () => {
    const { data } = await axios.get("http://localhost:8080/api/v1/users/me");
    return data;
  });

  const queryClient = new QueryClient();

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Box
            id="app"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <Navbar
              user={
                isLoading
                  ? null
                  : (data.user as unknown as {
                      displayName: string;
                      profilePictureLink: string;
                    } | null)
              }
            />
            <Switch>
              <Route path="/login">
                <h1>failure to log in</h1>
              </Route>
              <Route path="/posts">
                <Posts />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Box>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
