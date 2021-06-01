import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Announcement from "./Announcement";

export interface Props {
  announcements: Announcement[];
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

const Announcements: React.FC<Props> = ({ announcements }) => {
  const classes = useStyles();

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
      {announcements.map(({ title, announcementText, announcementId }) => (
        <Announcement
          title={title!}
          announcementId={announcementId!}
          announcementText={announcementText!}
        />
      ))}
    </Box>
  );
};
export default Announcements;
