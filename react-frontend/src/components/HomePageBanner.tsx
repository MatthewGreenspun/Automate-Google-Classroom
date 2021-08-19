import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    text: {
      fontSize: "1rem",
      [theme.breakpoints.up("md")]: {
        fontSize: "1.9rem",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "2.5rem",
      },
      color: "#fff",
    },
  })
);

const DescriptionParagraph = () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box
      bgcolor={theme.palette.secondary.main}
      minHeight="30vh"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      flexDirection="column"
      padding={2}
    >
      <Typography
        variant="h4"
        color="textSecondary"
        align="center"
        className={classes.text}
      >
        Easily create automated posts for Google Classroom.
      </Typography>
      <Button
        href={`${process.env.REACT_APP_SERVER_URL}/auth/login`}
        color="primary"
        variant="contained"
        size="large"
      >
        Get started
      </Button>
    </Box>
  );
};

export default DescriptionParagraph;
