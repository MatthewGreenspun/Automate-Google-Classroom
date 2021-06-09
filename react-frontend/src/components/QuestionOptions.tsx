import React from "react";
import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Alert from "@material-ui/lab/Alert";
import { getLocalScheduledTime } from "../utils/getLocalScheduledTime";
import { getLocalDayToPost } from "../utils/getLocalDayToPost";

interface Props {
  disabled: boolean;
  topics: { topicId: string; topicName: string }[];
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<{
      questionType: "mc" | "sa";
      points: "Ungraded" | number;
      topicToPost: string;
      dueDate: "No due date" | "Day posted";
      dueTime: string;
    }>
  >;
  editingQuestion?: Question;
}

const QuestionOptions: React.FC<Props> = ({
  disabled,
  topics,
  editingQuestion,
  setQuestionOptions,
}) => {
  const [questionType, setQuestionType] = useState<"mc" | "sa">("sa");
  const [points, setPoints] = useState<number | "Ungraded">(100);
  const [topicToPost, setTopicToPost] = useState<string>("No Topic");

  const [dueDate, setDueDate] =
    useState<"No due date" | "Day posted">("No due date");
  const [dueTime, setDueTime] = useState(
    `${
      editingQuestion
        ? //prettier-ignore
          getLocalScheduledTime(editingQuestion.scheduledTime!).substring(0,5) //substring removes am/pm
        : "07:30"
    }:00`
  );

  useEffect(() => {
    setQuestionOptions({
      questionType,
      points,
      topicToPost,
      dueDate,
      dueTime,
    });
  }, [questionType, points, topicToPost, dueDate, dueTime, setQuestionOptions]);

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <FormGroup>
        <TextField
          disabled={disabled}
          select
          margin="normal"
          label="Question type"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value as "sa" | "mc")}
          variant="filled"
        >
          <MenuItem value="sa">Short Answer</MenuItem>
          <MenuItem value="mc">Multiple Choice</MenuItem>
        </TextField>
      </FormGroup>
      <FormGroup>
        <Autocomplete
          freeSolo
          defaultValue="100"
          options={["Ungraded"]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Points"
              margin="normal"
              variant="filled"
              onChange={(e) => {
                if (!isNaN(Number(e.target.value)))
                  setPoints(Number(e.target.value));
                else setPoints("Ungraded");
              }}
            />
          )}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          disabled={disabled}
          select
          margin="normal"
          label="Topic"
          defaultValue="No topic"
          onChange={(e) => setTopicToPost(e.target.value)}
          variant="filled"
        >
          <MenuItem value="No topic">No topic</MenuItem>
          {topics.map(({ topicId, topicName }) => (
            <MenuItem value={topicId} key={topicId}>
              {topicName}
            </MenuItem>
          ))}
        </TextField>
      </FormGroup>
      <TextField
        disabled={disabled}
        select
        margin="normal"
        label="Due date"
        defaultValue="No due date"
        onChange={(e) => {
          setDueDate(e.target.value as "No due date" | "Day posted");
        }}
        variant="filled"
      >
        <MenuItem value="No due date">No due date</MenuItem>
        <MenuItem value="Day posted">Day posted</MenuItem>
      </TextField>
      {dueDate !== "No due date" && (
        <TextField
          disabled={disabled}
          margin="normal"
          label="Due time"
          type="time"
          variant="filled"
          defaultValue="07:30"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    </Box>
  );
};

export default QuestionOptions;
