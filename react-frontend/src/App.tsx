import React from "react";
import ClassroomAnimation from "./components/ClassroomAnimation";
import Navbar from "./components/Navbar";
import CreateAnnouncement from "./components/CreateAnnouncement";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box } from "@material-ui/core";
import "./App.css";
import "./classroomAnimation.css";

function App() {
  return (
    <Router>
      <div id="app">
        <Navbar />
        <Switch>
          <Route path="/login">
            <div>failure to log in</div>
          </Route>
          <Route path="/assignments">
            <Box display="flex" justifyContent="center">
              <CreateAnnouncement
                courses={[
                  { courseId: "23432124", courseName: "Global History P1" },
                  { courseId: "2342379", courseName: "Global History P5" },
                ]}
              />
            </Box>
          </Route>
          <Route path="/">
            <Box display="flex" justifyContent="center">
              <ClassroomAnimation />
            </Box>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
