import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@material-ui/core";

const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface Props {
  courses: { courseId: string; courseName: string }[];
  setOptionsAreFilledOut: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostOptions: React.FC<Props> = ({
  courses,
  setOptionsAreFilledOut: setReadyToSubmit,
}) => {
  const [coursesToPost, setCoursesToPost] = useState(
    courses.map((course) => ({ isSelected: false, ...course }))
  );

  const [daysToPost, setDaysToPost] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);
  const [dayToPostSelection, setDayToPostSelection] = useState("Every Weekday"); //daysToPost is what is sent to backend. daysToPostSelection is shown in the input

  const [timeToPost, setTimeToPost] = useState("07:30:00");
  useEffect(() => {
    const hasDaysToPost = daysToPost.length > 0;
    const hasCoursesToPost = coursesToPost.some(
      (course) => course.isSelected === true
    );
    setReadyToSubmit(!!(hasDaysToPost && hasCoursesToPost && timeToPost));
  }, [daysToPost, coursesToPost, setReadyToSubmit, timeToPost]);
  return (
    <Box>
      <FormLabel component="legend">For </FormLabel>
      <FormGroup>
        {courses.map((course, idx) => (
          <FormControlLabel
            label={course.courseName}
            control={<Checkbox color="primary" key={idx} />}
            onChange={() =>
              setCoursesToPost(
                coursesToPost.map((courseToPost) =>
                  courseToPost.courseId === course.courseId
                    ? { ...courseToPost, isSelected: !courseToPost.isSelected }
                    : courseToPost
                )
              )
            }
          />
        ))}
      </FormGroup>
      <Box display="flex" flexDirection="column">
        <TextField
          select
          margin="normal"
          label="Days to post"
          value={dayToPostSelection}
          onChange={(e) => {
            if (e.target.value === "Every Weekday")
              setDaysToPost([
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ]);
            else if (e.target.value === "Every Day")
              setDaysToPost([
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ]);
            else if (e.target.value === "Custom") setDaysToPost([]);
            setDayToPostSelection(e.target.value);
          }}
          variant="filled"
        >
          <MenuItem value="Every Weekday">Every Weekday</MenuItem>
          <MenuItem value="Every Day">Every Day</MenuItem>
          <MenuItem value="Custom">Custom</MenuItem>
        </TextField>
        {dayToPostSelection === "Custom" && (
          <FormGroup>
            {daysOfTheWeek.map((day, idx) => (
              <FormControlLabel
                label={day}
                control={<Checkbox color="primary" key={idx} />}
                onChange={(e) =>
                  setDaysToPost(
                    daysToPost.some((arrDay) => arrDay === day)
                      ? daysToPost.filter((arrDay) => arrDay !== day)
                      : [day, ...daysToPost]
                  )
                }
              />
            ))}
          </FormGroup>
        )}
        <TextField
          margin="normal"
          label="Time to post"
          type="time"
          variant="filled"
          defaultValue="07:30"
          value={timeToPost}
          onChange={(e) => setTimeToPost(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
    </Box>
  );
};

export default PostOptions;
