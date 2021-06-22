import { Box, Typography } from "@material-ui/core";

const DescriptionParagraph = () => {
  return (
    <Box
      maxWidth="70ch"
      margin="2em auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={1}
    >
      <Typography paragraph variant="body1">
        Do you find yourself posting the same questions on Google Classroom over
        and over again? Perhaps you post a daily attendance question or a weekly
        check in. If you want to completely automate the process of posting
        these questions or announcements, sign in with Google to get started. It
        only takes a few minutes to set up.
      </Typography>
    </Box>
  );
};

export default DescriptionParagraph;
