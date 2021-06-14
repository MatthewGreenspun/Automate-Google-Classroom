import React, { useState, useContext } from "react";
import { EditingContext } from "./Posts";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LiveHelpOutlinedIcon from "@material-ui/icons/LiveHelpOutlined";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { getLocalDayToPost } from "../utils/getLocalDayToPost";
import { getLocalScheduledTime } from "../utils/getLocalScheduledTime";

export interface Props {
  question: Question;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletingId: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardTitle: {
      cursor: "pointer",
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
      transition: "0.2s linear",
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    card: {
      marginTop: "5px",
      width: "100%",
      maxWidth: theme.breakpoints.values.md,
    },
    announcementIcon: {
      backgroundColor: theme.palette.primary.main,
    },
    newLine: {
      whiteSpace: "pre-wrap",
    },
    actionIcon: {
      marginRight: "10px",
    },
  })
);

const Question: React.FC<Props> = ({
  question,
  setIsDeleting,
  setDeletingId,
}) => {
  const classes = useStyles();
  const setEditingPostId = useContext(EditingContext)!;
  const { title, description, postingDays, scheduledTime, questionId } =
    question;
  const [isExpanded, setIsExpanded] = useState(false);
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.card + " " + classes.cardHeader}
        avatar={
          <Avatar className={classes.announcementIcon}>
            <LiveHelpOutlinedIcon />
          </Avatar>
        }
        title={
          <Typography
            onClick={() => setIsExpanded(!isExpanded)}
            variant="h4"
            className={classes.cardTitle + " " + classes.newLine}
          >
            {title}
          </Typography>
        }
        action={
          <IconButton
            onClick={(e) => {
              setAnchorElement(e.currentTarget);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Menu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={() => setAnchorElement(null)}
      >
        <MenuItem onClick={() => setEditingPostId(questionId!)}>
          <EditIcon className={classes.actionIcon} /> Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsDeleting(true);
            setDeletingId(questionId!);
            setAnchorElement(null);
          }}
        >
          <DeleteIcon className={classes.actionIcon} /> Delete
        </MenuItem>
      </Menu>
      {!isExpanded && (
        <CardContent>
          <Typography noWrap>{description}</Typography>
        </CardContent>
      )}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography className={classes.newLine}>{description}</Typography>

          <Box display="flex" alignItems="center" marginTop={3}>
            <AccessTimeIcon className={classes.actionIcon} />
            <Typography>{getLocalScheduledTime(scheduledTime!)}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <DateRangeIcon className={classes.actionIcon} />
            <Typography>
              {postingDays!.map(
                (day, idx) =>
                  `${idx === 0 ? "" : ", "}${getLocalDayToPost(
                    day as WeekDay,
                    scheduledTime!
                  )}`
              )}
            </Typography>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Question;
