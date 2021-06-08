import { useState, useEffect } from "react";
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
  refetchQuestions: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Question[], unknown>>;
  isEditing: boolean;
  setEditingPostId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsCreatingPost: React.Dispatch<React.SetStateAction<boolean>>;
  courses: Course[];
  editingQuestion?: Question;
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
  refetchQuestions,
  editingQuestion,
}) => {
  const [optionsAreFilledOut, setOptionsAreFilledOut] = useState(false);
  const [options, setOptions] = useState<{
    daysToPost: string[];
    timeToPost: string;
    coursesToPost: string[];
  }>({ daysToPost: [], timeToPost: "", coursesToPost: [] });

  const [title, setTitle] = useState(
    editingQuestion ? editingQuestion.title! : ""
  );
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState(
    editingQuestion ? editingQuestion.description! : ""
  );
  const [coursesError, setCoursesError] = useState(false);
  const [daysError, setDaysError] = useState(false);

  useEffect(() => {
    if (options.coursesToPost.length > 0 && coursesError)
      setCoursesError(false);
    if (options.daysToPost.length > 0 && daysError) setDaysError(false);
  }, [coursesError, daysError, options.coursesToPost, options.daysToPost]);

  const postMutation = useMutation((newAnnouncement: Announcement) =>
    axios.post(
      "http://localhost:8080/api/v1/createpost/announcement",
      newAnnouncement
    )
  );
  const editMutation = useMutation((newQuestion: Question) =>
    axios.put(
      `http://localhost:8080/api/v1/editpost/announcement/${
        editingQuestion!.questionId
      }`,
      newQuestion
    )
  );
  function handleValidation() {
    if (title.trim().length === 0) setTitleError(true);
    else setTitleError(false);

    if (options.coursesToPost.length === 0) setCoursesError(true);
    else setCoursesError(false);

    if (options.daysToPost.length === 0) setDaysError(true);
    else setDaysError(false);
  }
  function handlePost() {
    handleValidation();
    if (optionsAreFilledOut && title.trim() && description.trim()) {
      const postingDaysUTC = options.daysToPost.map((day) =>
        getUTCDayToPost(day as WeekDay, options.timeToPost)
      );
      const scheduledTimeUTC = getUTCScheduledTime(options.timeToPost);

      postMutation.mutate(
        {
          courseIds: options.coursesToPost,
          title: title.trim(),
          announcementText: description.trim(),
          postingDays: postingDaysUTC as string[],
          scheduledTime: scheduledTimeUTC,
        },
        {
          onSuccess: () => {
            setIsCreatingPost(false);
            setEditingPostId(null);
            refetchQuestions();
          },
        }
      );
    }
  }

  function handleEdit() {
    handleValidation();
    if (optionsAreFilledOut && title.trim() && description.trim()) {
      const postingDaysUTC = options.daysToPost.map((day) =>
        getUTCDayToPost(day as WeekDay, options.timeToPost)
      );
      const scheduledTimeUTC = getUTCScheduledTime(options.timeToPost);
      const newQuestion = {
        courseIds:
          JSON.stringify(options.coursesToPost) !==
          JSON.stringify(editingQuestion!.courseIds)
            ? options.coursesToPost
            : undefined,
        title:
          title.trim() !== editingQuestion!.title ? title.trim() : undefined,
        description:
          description.trim() !== editingQuestion!.description
            ? description.trim()
            : undefined,
        postingDays:
          JSON.stringify(postingDaysUTC) !==
          JSON.stringify(editingQuestion!.postingDays)
            ? (postingDaysUTC as string[])
            : undefined,
        scheduledTime:
          scheduledTimeUTC !== editingQuestion!.scheduledTime
            ? scheduledTimeUTC
            : undefined,
      };

      if (
        //checks to make sure changes were actually made to the announcement
        Object.keys(newQuestion).some(
          (key) =>
            newQuestion[
              key as
                | "courseIds"
                | "title"
                | "description"
                | "postingDays"
                | "scheduledTime"
            ] !== undefined
        )
      ) {
        editMutation.mutate(newQuestion, {
          onSuccess: () => {
            setEditingPostId(null);
            refetchQuestions();
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
          error={titleError}
          helperText={titleError ? "Title is required" : ""}
          label="Title"
          variant="filled"
          margin="normal"
          fullWidth
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (titleError && e.target.value.trim().length > 0)
              setTitleError(false);
          }}
          disabled={postMutation.isLoading}
        />
        <TextField
          label="Instructions (optional)"
          variant="filled"
          multiline
          fullWidth
          rows={5}
          rowsMax={15}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={postMutation.isLoading}
        />
      </Box>
      <Box className={classes.optionsContainer}>
        <PostOptions
          disabled={postMutation.isLoading}
          coursesError={coursesError}
          daysError={daysError}
          courses={courses}
          setOptionsAreFilledOut={setOptionsAreFilledOut}
          setOptions={setOptions}
          editingAnnouncement={editingQuestion}
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
