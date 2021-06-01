import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import PostOptions from "./PostOptions";
import { getUTCScheduledTime } from "../utils/getUTCScheduledTime";
import { getUTCDayToPost } from "../utils/getUTCDayToPost";

interface Props {
  setIsCreatingPost: React.Dispatch<React.SetStateAction<boolean>>;
  courses: { courseId: string; courseName: string }[];
  title?: string;
  announcementText?: string;
  scheduledTime?: string;
  postingDays?: WeekDay[];
}

const CreateAnnouncement: React.FC<Props> = ({ courses }) => {
  const [optionsAreFilledOut, setOptionsAreFilledOut] = useState(false);
  const [options, setOptions] = useState<{
    daysToPost: string[];
    timeToPost: string;
    coursesToPost: string[];
  }>({ daysToPost: [], timeToPost: "", coursesToPost: [] });

  const [title, setTitle] = useState("");
  const [announcementText, setAnnouncementText] = useState("");

  const mutation = useMutation((newAnnouncement: Announcement) =>
    axios.post(
      "http://localhost:8080/api/v1/createpost/announcement",
      newAnnouncement
    )
  );

  function handlePost() {
    if (optionsAreFilledOut && title.trim() && announcementText.trim()) {
      const postingDaysUTC = options.daysToPost.map((day) =>
        getUTCDayToPost(day as WeekDay, options.timeToPost)
      );
      const scheduledTimeUTC = getUTCScheduledTime(options.timeToPost);

      mutation.mutate({
        courseIds: options.coursesToPost,
        title: title.trim(),
        announcementText: announcementText.trim(),
        postingDays: postingDaysUTC as unknown as string[],
        scheduledTime: scheduledTimeUTC,
      });
    }
  }

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
      <TextField
        label="Title"
        variant="filled"
        margin="normal"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={mutation.isLoading}
      />
      <TextField
        label="Announce something to your class"
        variant="filled"
        multiline
        fullWidth
        rows={4}
        margin="normal"
        value={announcementText}
        onChange={(e) => setAnnouncementText(e.target.value)}
        disabled={mutation.isLoading}
      />
      <PostOptions
        disabled={mutation.isLoading}
        courses={courses}
        setOptionsAreFilledOut={setOptionsAreFilledOut}
        setOptions={setOptions}
      />
      <Button
        onClick={() => handlePost()}
        color="primary"
        variant="contained"
        disabled={mutation.isLoading}
      >
        Create
      </Button>
    </Box>
  );
};

export default CreateAnnouncement;
