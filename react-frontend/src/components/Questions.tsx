import { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Question from "./Question";
import DeleteDialog from "./DeleteDialog";
import { useMutation } from "react-query";
import axios from "axios";

export interface Props {
  questions: Question[];
  refetchQuestions: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      "@media (max-width:770px)": {
        fontSize: "2rem",
      },
      textAlign: "center",
    },
  })
);

const Announcements: React.FC<Props> = ({ questions, refetchQuestions }) => {
  const classes = useStyles();

  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const mutation = useMutation((_) =>
    axios.delete(
      `http://localhost:8080/api/v1/deletepost/announcement/${deletingId}`
    )
  );

  function handleDelete() {
    setIsDeleting(false);
    mutation.mutate();
    refetchQuestions();
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      maxWidth="800px"
    >
      <Typography variant="h3" className={classes.title}>
        Questions
      </Typography>
      {questions.map((question) => (
        <Question
          question={question}
          setIsDeleting={setIsDeleting}
          setDeletingId={setDeletingId}
        />
      ))}
      <DeleteDialog
        type="question"
        isOpen={isDeleting}
        setIsOpen={setIsDeleting}
        handleDelete={handleDelete}
      />
    </Box>
  );
};
export default Announcements;
