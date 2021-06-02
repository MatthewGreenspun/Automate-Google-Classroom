import { useState } from "react";
import { QueryObserverResult, RefetchOptions, useMutation } from "react-query";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import PostOptions from "./PostOptions";
import { getUTCScheduledTime } from "../utils/getUTCScheduledTime";
import { getUTCDayToPost } from "../utils/getUTCDayToPost";

interface Props {
  refetchAnnouncements: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Announcement[], unknown>>;
  setIsCreatingPost: React.Dispatch<React.SetStateAction<boolean>>;
  courses: Course[];
  title?: string;
  announcementText?: string;
  scheduledTime?: string;
  postingDays?: WeekDay[];
}

const CreateAnnouncement: React.FC<Props> = ({
  courses,
  setIsCreatingPost,
  refetchAnnouncements,
}) => {
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

      mutation.mutate(
        {
          courseIds: options.coursesToPost,
          title: title.trim(),
          announcementText: announcementText.trim(),
          postingDays: postingDaysUTC as string[],
          scheduledTime: scheduledTimeUTC,
        },
        {
          onSuccess: () => {
            setIsCreatingPost(false);
            refetchAnnouncements();
          },
        }
      );
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
