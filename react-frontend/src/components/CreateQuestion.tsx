import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import Button from "@material-ui/core/Button";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import PostOptions from "./PostOptions";
import QuestionOptions from "./QuestionOptions";
import { getUTCScheduledTime } from "../utils/getUTCScheduledTime";
import { getUTCDayToPost } from "../utils/getUTCDayToPost";
import { useCreatePostStyles } from "./CreateAnnouncement";

interface Props {
  refetchQuestions: () => void;
  isEditing: boolean;
  setEditingPostId: React.Dispatch<React.SetStateAction<string | null>>;
  setCreatingPostType: React.Dispatch<
    React.SetStateAction<"announcement" | "question" | null>
  >;
  courses: Course[];
  editingQuestion?: Question;
}

const CreateAnnouncement: React.FC<Props> = ({
  courses,
  setCreatingPostType,
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
  const [questionOptions, setQuestionOptions] = useState<{
    questionType: "mc" | "sa";
    points: "Ungraded" | number;
    dueDate: "No due date" | "Day posted";
    dueTime: string;
    submissionModifiable: boolean;
  }>({
    questionType: "sa",
    points: 100,
    dueDate: "No due date",
    dueTime: "07:30:00",
    submissionModifiable: false,
  });
  const [title, setTitle] = useState(
    editingQuestion ? editingQuestion.title! : ""
  );
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState(
    editingQuestion ? editingQuestion.description! : ""
  );
  const [choices, setChoices] = useState([{ id: 1, val: "Choice 1" }]);
  const [coursesError, setCoursesError] = useState(false);
  const [daysError, setDaysError] = useState(false);

  useEffect(() => {
    if (options.coursesToPost.length > 0 && coursesError)
      setCoursesError(false);
    if (options.daysToPost.length > 0 && daysError) setDaysError(false);
  }, [coursesError, daysError, options.coursesToPost, options.daysToPost]);

  const postMutation = useMutation((newQuestion: Question) =>
    axios.post(
      `http://localhost:8080/api/v1/createpost/${questionOptions.questionType}question`,
      newQuestion
    )
  );
  const editMutation = useMutation((newQuestion: Question) =>
    axios.put(
      `http://localhost:8080/api/v1/editpost/${
        questionOptions.questionType
      }question/${editingQuestion!.questionId}`,
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
    if (optionsAreFilledOut && title.trim()) {
      const postingDaysUTC = options.daysToPost.map((day) =>
        getUTCDayToPost(day as WeekDay, options.timeToPost)
      );
      const scheduledTimeUTC = getUTCScheduledTime(options.timeToPost);

      postMutation.mutate(
        {
          courseIds: options.coursesToPost,
          title: title.trim(),
          description: description.trim(),
          postingDays: postingDaysUTC as string[],
          scheduledTime: scheduledTimeUTC,
          topicId: "No topic",
          dueDate:
            questionOptions.dueDate === "No due date"
              ? undefined
              : questionOptions.dueDate,
          dueTime: questionOptions.dueTime,
          submissionModifiable: questionOptions.submissionModifiable,
          maxPoints:
            questionOptions.points === "Ungraded" ? 0 : questionOptions.points,
          choices:
            questionOptions.questionType === "mc"
              ? choices.map(({ val }) => val)
              : undefined,
        },
        {
          onSuccess: () => {
            setCreatingPostType(null);
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
  const classes = useCreatePostStyles();

  return (
    <Box
      maxWidth="1000px"
      width="100%"
      border={1}
      borderRadius={4}
      borderColor="#4285f4"
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

        {questionOptions.questionType === "mc" &&
          choices.map((choice) => (
            <Box
              display="flex"
              alignItems="center"
              key={choice.id}
              marginBottom={1}
            >
              <RadioButtonCheckedIcon
                color="secondary"
                style={{ marginRight: "7px" }}
              />
              <TextField
                fullWidth
                value={choice.val}
                onChange={(e) =>
                  setChoices(
                    choices.map(({ id, val }) =>
                      id === choice.id
                        ? { id, val: e.target.value }
                        : { id, val }
                    )
                  )
                }
              />
              {choices.length > 1 && (
                <IconButton
                  onClick={() =>
                    setChoices(choices.filter(({ id }) => choice.id !== id))
                  }
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
          ))}
        {questionOptions.questionType === "mc" && (
          <Button
            color="primary"
            variant="contained"
            onClick={() =>
              setChoices([
                ...choices,
                {
                  id: choices[choices.length - 1].id + 1,
                  val: "Choice " + (choices.length + 1),
                },
              ])
            }
          >
            <AddIcon style={{ marginRight: "7px" }} /> New
          </Button>
        )}
      </Box>

      <Box className={classes.optionsContainer}>
        <QuestionOptions
          disabled={postMutation.isLoading}
          topics={[]}
          setQuestionOptions={setQuestionOptions}
        />
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
