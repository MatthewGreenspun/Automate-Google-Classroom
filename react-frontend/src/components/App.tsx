import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Posts from "./Posts";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box, ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

function App() {
  const theme = createMuiTheme({
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

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Box
          id="app"
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Navbar />
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
    </Router>
  );
}

export default App;
