import React from "react";
import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getLocalScheduledTime } from "../utils/getLocalScheduledTime";

interface Props {
  disabled: boolean;
  topics: { topicId: string; topicName: string }[];
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<{
      questionType: "mc" | "sa";
      points: "Ungraded" | number;
      dueDate: "No due date" | "Day posted";
      dueTime: string;
      submissionModifiable: boolean;
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
  const [submissionModifiable, setSubmissionModifiable] = useState(false);

  const [dueDate, setDueDate] =
    useState<"No due date" | "Day posted">("No due date");
  const [dueTime, setDueTime] = useState("07:30");

  useEffect(() => {
    setQuestionOptions({
      questionType,
      points: points === 0 || points === "Ungraded" ? "Ungraded" : points,
      dueDate,
      dueTime,
      submissionModifiable,
    });
  }, [
    questionType,
    points,
    dueDate,
    dueTime,
    submissionModifiable,
    setQuestionOptions,
  ]);

  useEffect(() => {
    if (editingQuestion) {
      setQuestionType(editingQuestion.type!);
      setPoints(
        editingQuestion.maxPoints === 0
          ? "Ungraded"
          : editingQuestion.maxPoints!
      );
      setSubmissionModifiable(editingQuestion.submissionModifiable!);
      setDueDate(editingQuestion.dueDate ? "Day posted" : "No due date");
      setDueTime(
        getLocalScheduledTime(editingQuestion.scheduledTime!).substring(0, 5)
      ); //substring removes am/pm
    }
  }, [editingQuestion]);

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
          onSelect={(e) => {
            if ((e.target as any).value === "Ungraded") setPoints("Ungraded");
          }}
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
      <TextField
        disabled={disabled}
        select
        margin="normal"
        label="Due date"
        defaultValue="No due date"
        value={dueDate}
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
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={submissionModifiable}
            onChange={(e) => setSubmissionModifiable(e.target.checked)}
          />
        }
        label="Students can edit answer"
      />
    </Box>
  );
};

export default QuestionOptions;
