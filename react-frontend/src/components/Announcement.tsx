import { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
  Avatar,
  Collapse,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AnnouncementOutlinedIcon from "@material-ui/icons/AnnouncementOutlined";

export interface Props {
  announcementId: string;
  title: string;
  announcementText: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardTitle: {
      "@media (max-width: 600px)": {
        fontSize: "1.5rem",
      },
    },
    announcementText: {
      transition: "0.1s linear",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: theme.palette.primary.light,
      },
    },
    cardHeader: {
      cursor: "pointer",
      transition: "0.2s linear",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    card: {
      width: "100%",
      maxWidth: theme.breakpoints.values.md,
    },
    announcementIcon: {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const Announcement: React.FC<Props> = ({
  announcementId,
  announcementText,
  title,
}) => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={classes.card}>
      <CardHeader
        onClick={() => setIsExpanded(!isExpanded)}
        className={classes.card + " " + classes.cardHeader}
        avatar={
          <Avatar className={classes.announcementIcon}>
            <AnnouncementOutlinedIcon />
          </Avatar>
        }
        title={
          <Typography variant="h4" className={classes.cardTitle}>
            {title}
          </Typography>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
      {!isExpanded && (
        <CardContent>
          <Typography noWrap>{announcementText}</Typography>
        </CardContent>
      )}
      <CardActions></CardActions>
      <Collapse in={isExpanded} timeout={1} unmountOnExit>
        <CardContent>
          <Typography>{announcementText}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Announcement;
