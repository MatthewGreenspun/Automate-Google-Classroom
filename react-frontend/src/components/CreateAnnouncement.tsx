import { useState } from "react";
import { QueryObserverResult, RefetchOptions, useMutation } from "react-query";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import PostOptions from "./PostOptions";
import { getUTCScheduledTime } from "../utils/getUTCScheduledTime";
import { getUTCDayToPost } from "../utils/getUTCDayToPost";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface Props {
  refetchAnnouncements: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Announcement[], unknown>>;
  isEditing: boolean;
  setEditingPostId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsCreatingPost: React.Dispatch<React.SetStateAction<boolean>>;
  courses: Course[];
  editingAnnouncement?: Announcement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerContainer: {
      display: "block",
      "@media (min-width:1000px)": {
        display: "flex",
        justifyContent: "space-between",
      },
    },
    textContainer: {
      display: "block",
      "@media (min-width:1000px)": {
        flexGrow: "1",
        marginRight: theme.spacing(2),
      },
    },
    optionsContainer: {
      display: "block",
      "@media (min-width:1000px)": {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      },
    },
  })
);

const CreateAnnouncement: React.FC<Props> = ({
  courses,
  setIsCreatingPost,
  isEditing,
  setEditingPostId,
  refetchAnnouncements,
  editingAnnouncement,
}) => {
  const [optionsAreFilledOut, setOptionsAreFilledOut] = useState(false);
  const [options, setOptions] = useState<{
    daysToPost: string[];
    timeToPost: string;
    coursesToPost: string[];
  }>({ daysToPost: [], timeToPost: "", coursesToPost: [] });

  const [title, setTitle] = useState(
    editingAnnouncement ? editingAnnouncement.title! : ""
  );
  const [announcementText, setAnnouncementText] = useState(
    editingAnnouncement ? editingAnnouncement.announcementText! : ""
  );

  const postMutation = useMutation((newAnnouncement: Announcement) =>
    axios.post(
      "http://localhost:8080/api/v1/createpost/announcement",
      newAnnouncement
    )
  );
  const editMutation = useMutation((newAnnouncement: Announcement) =>
    axios.put(
      `http://localhost:8080/api/v1/editpost/announcement/${
        editingAnnouncement!.announcementId
      }`,
      newAnnouncement
    )
  );

  function handlePost() {
    if (optionsAreFilledOut && title.trim() && announcementText.trim()) {
      const postingDaysUTC = options.daysToPost.map((day) =>
        getUTCDayToPost(day as WeekDay, options.timeToPost)
      );
      const scheduledTimeUTC = getUTCScheduledTime(options.timeToPost);

      postMutation.mutate(
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
            setEditingPostId(null);
            refetchAnnouncements();
          },
        }
      );
    }
  }

  function handleEdit() {
    if (optionsAreFilledOut && title.trim() && announcementText.trim()) {
      const postingDaysUTC = options.daysToPost.map((day) =>
        getUTCDayToPost(day as WeekDay, options.timeToPost)
      );
      const scheduledTimeUTC = getUTCScheduledTime(options.timeToPost);
      const newAnnouncement = {
        courseIds:
          JSON.stringify(options.coursesToPost) !==
          JSON.stringify(editingAnnouncement!.courseIds)
            ? options.coursesToPost
            : undefined,
        title:
          title.trim() !== editingAnnouncement!.title
            ? title.trim()
            : undefined,
        announcementText:
          announcementText.trim() !== editingAnnouncement!.announcementText
            ? announcementText.trim()
            : undefined,
        postingDays:
          JSON.stringify(postingDaysUTC) !==
          JSON.stringify(editingAnnouncement!.postingDays)
            ? (postingDaysUTC as string[])
            : undefined,
        scheduledTime:
          scheduledTimeUTC !== editingAnnouncement!.scheduledTime
            ? scheduledTimeUTC
            : undefined,
      };

      if (
        //checks to make sure changes were actually made to the announcement
        Object.keys(newAnnouncement).some(
          (key) =>
            newAnnouncement[
              key as
                | "courseIds"
                | "title"
                | "announcementText"
                | "postingDays"
                | "scheduledTime"
            ] !== undefined
        )
      ) {
        editMutation.mutate(newAnnouncement, {
          onSuccess: () => {
            setEditingPostId(null);
            refetchAnnouncements();
          },
        });
      } else setEditingPostId(null);
    }
  }
  const classes = useStyles();

  return (
    <Box
      maxWidth="1000px"
      width="100%"
      border={1}
      borderRadius={4}
      borderColor="primary"
      p={2}
      m={2}
      className={classes.outerContainer}
    >
      <Box className={classes.textContainer}>
        <TextField
          label="Title"
          variant="filled"
          margin="normal"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={postMutation.isLoading}
        />
        <TextField
          label="Announce something to your class"
          variant="filled"
          multiline
          fullWidth
          rows={5}
          rowsMax={15}
          margin="normal"
          value={announcementText}
          onChange={(e) => setAnnouncementText(e.target.value)}
          disabled={postMutation.isLoading}
        />
      </Box>
      <Box className={classes.optionsContainer}>
        <PostOptions
          disabled={postMutation.isLoading}
          courses={courses}
          setOptionsAreFilledOut={setOptionsAreFilledOut}
          setOptions={setOptions}
          editingAnnouncement={editingAnnouncement}
        />
        <Button
          onClick={() => (isEditing ? handleEdit() : handlePost())}
          color="primary"
          variant="contained"
          disabled={postMutation.isLoading}
        >
          {isEditing ? "Save" : "Create"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAnnouncement;
