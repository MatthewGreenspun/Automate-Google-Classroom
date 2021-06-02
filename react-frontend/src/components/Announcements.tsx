import { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Announcement from "./Announcement";
import DeleteDialog from "./DeleteDialog";
import { QueryObserverResult, RefetchOptions, useMutation } from "react-query";
import axios from "axios";

export interface Props {
  announcements: Announcement[];
  refetchAnnouncements: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<Announcement[], unknown>>;
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

const Announcements: React.FC<Props> = ({
  announcements,
  refetchAnnouncements,
}) => {
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
    refetchAnnouncements();
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
        Announcements
      </Typography>
      {announcements.map((announcement) => (
        <Announcement
          announcement={announcement}
          setIsDeleting={setIsDeleting}
          setDeletingId={setDeletingId}
        />
      ))}
      <DeleteDialog
        type="announcement"
        isOpen={isDeleting}
        setIsOpen={setIsDeleting}
        handleDelete={handleDelete}
      />
    </Box>
  );
};
export default Announcements;
