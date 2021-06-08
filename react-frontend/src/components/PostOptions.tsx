import React from "react";
import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import { getLocalScheduledTime } from "../utils/getLocalScheduledTime";
import { getLocalDayToPost } from "../utils/getLocalDayToPost";

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
  disabled: boolean;
  courses: { courseId: string; courseName: string }[];
  setOptionsAreFilledOut: React.Dispatch<React.SetStateAction<boolean>>;
  setOptions: React.Dispatch<
    React.SetStateAction<{
      daysToPost: string[];
      timeToPost: string;
      coursesToPost: string[];
    }>
  >;
  editingAnnouncement?: Announcement;
}

const PostOptions: React.FC<Props> = ({
  disabled,
  courses,
  setOptionsAreFilledOut: setReadyToSubmit,
  setOptions,
  editingAnnouncement,
}) => {
  const [coursesToPost, setCoursesToPost] = useState(
    courses.map((course) => ({
      isSelected:
        editingAnnouncement &&
        editingAnnouncement.courseIds?.includes(course.courseId)
          ? true
          : false,
      ...course,
    }))
  );

  const [daysToPost, setDaysToPost] = useState(
    editingAnnouncement
      ? editingAnnouncement.postingDays!.map((day) =>
          getLocalDayToPost(day as WeekDay, editingAnnouncement.scheduledTime!)
        )
      : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  );
  const [dayToPostSelection, setDayToPostSelection] = useState(
    editingAnnouncement ? "Custom" : "Every Weekday"
  ); //daysToPost is what is sent to backend. daysToPostSelection is shown in the input
  const [timeToPost, setTimeToPost] = useState(
    `${
      editingAnnouncement
        ? //prettier-ignore
          getLocalScheduledTime(editingAnnouncement.scheduledTime!).substring(0,5) //substring removes am/pm
        : "07:30"
    }:00`
  );

  useEffect(() => {
    const hasDaysToPost = daysToPost.length > 0;
    const hasCoursesToPost = coursesToPost.some(
      (course) => course.isSelected === true
    );
    setReadyToSubmit(!!(hasDaysToPost && hasCoursesToPost && timeToPost));
    setOptions({
      coursesToPost: coursesToPost
        .filter((course) => course.isSelected)
        .map((course) => course.courseId),
      timeToPost,
      daysToPost: daysToPost.map((day) => day.substring(0, 3)),
    });
  }, [daysToPost, coursesToPost, setReadyToSubmit, timeToPost, setOptions]);

  return (
    <Box>
      <FormLabel component="legend">For </FormLabel>
      <FormGroup>
        {courses.map((course, idx) => (
          <FormControlLabel
            label={course.courseName}
            control={
              <Checkbox
                color="primary"
                key={idx}
                disabled={disabled}
                checked={coursesToPost.some(
                  ({ courseId, isSelected }) =>
                    courseId === course.courseId && isSelected
                )}
              />
            }
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
          disabled={disabled}
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
                control={
                  <Checkbox
                    color="primary"
                    key={idx}
                    disabled={disabled}
                    checked={daysToPost.includes(day)}
                  />
                }
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
          disabled={disabled}
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
