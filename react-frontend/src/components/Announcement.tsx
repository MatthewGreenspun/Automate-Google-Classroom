import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AnnouncementOutlinedIcon from "@material-ui/icons/AnnouncementOutlined";

export interface Props {
  announcementId: string;
  title: string;
  announcementText: string;
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

const Announcement: React.FC<Props> = ({
  announcementId,
  announcementText,
  title,
}) => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.card + " " + classes.cardHeader}
        avatar={
          <Avatar className={classes.announcementIcon}>
            <AnnouncementOutlinedIcon />
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
        <MenuItem onClick={() => 0 /*fill out funtion later*/}>
          <EditIcon className={classes.actionIcon} /> Edit
        </MenuItem>
        <MenuItem onClick={() => 0 /*fill out function later*/}>
          <DeleteIcon className={classes.actionIcon} /> Delete
        </MenuItem>
      </Menu>
      {!isExpanded && (
        <CardContent>
          <Typography noWrap>{announcementText}</Typography>
        </CardContent>
      )}
      <CardActions></CardActions>
      <Collapse in={isExpanded} timeout={1} unmountOnExit>
        <CardContent>
          <Typography className={classes.newLine}>
            {announcementText}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Announcement;
