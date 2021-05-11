import { useState } from "react";
import { Box, TextField } from "@material-ui/core";
import PostOptions from "./PostOptions";

interface Props {
  courses: { courseId: string; courseName: string }[];
}

const CreateAnnouncement: React.FC<Props> = ({ courses }) => {
  const [optionsAreFilledOut, setOptionsAreFilledOut] = useState(false);
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
      <TextField label="Title" variant="filled" margin="normal" fullWidth />
      <TextField
        label="Announce something to your class"
        variant="filled"
        multiline
        fullWidth
        rows={4}
        margin="normal"
      />
      <PostOptions
        courses={courses}
        setOptionsAreFilledOut={setOptionsAreFilledOut}
      />
    </Box>
  );
};

export default CreateAnnouncement;
