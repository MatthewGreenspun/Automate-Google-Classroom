import { Box, Typography, Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const DescriptionParagraph = () => {
  const theme = useTheme();

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
      <Typography variant="h4" color="textSecondary" align="center">
        Easily create automated posts for Google Classroom.
      </Typography>
      <Button
        href="/auth/login"
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
