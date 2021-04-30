import {
  Box,
  TextField,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useState } from "react";

interface Props {
  courses: { courseId: string; courseName: string }[];
}

const CreateAnnouncement: React.FC<Props> = ({ courses }) => {
  const [coursesToPost, setCoursesToPost] = useState(
    courses.map((course) => ({ isSelected: false, ...course }))
  );
  return (
    <Box
      maxWidth="800px"
      width="100%"
      border={1}
      borderRadius={4}
      borderColor="primary"
      p={2}
      m={2}
    >
      <TextField label="Title" variant="filled" margin="normal" />
      <TextField
        label="Announce something to your class"
        variant="filled"
        multiline
        fullWidth
        rows={4}
        margin="normal"
      />
      <FormLabel component="legend">For </FormLabel>
      <FormGroup>
        {courses.map((course) => (
          <FormControlLabel
            label={course.courseName}
            control={<Checkbox color="primary" />}
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
    </Box>
  );
};

export default CreateAnnouncement;
