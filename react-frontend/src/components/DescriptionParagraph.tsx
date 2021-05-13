import { Box, Typography, Button } from "@material-ui/core";

const DescriptionParagraph = () => {
  return (
    <Box maxWidth="70ch" margin="2em auto">
      <Typography paragraph variant="body1">
        Do you find yourself posting the same questions on Google Classroom over
        and over again? Perhaps you post a daily attendance question or a weekly
        check in. If you want to completely automate the process of posting
        these questions or announcements, get started by clicking below. It only
        takes a few minutes to set up.
      </Typography>
      <Button href="/login" color="primary" variant="contained">
        Get started!
      </Button>
    </Box>
  );
};

export default DescriptionParagraph;
