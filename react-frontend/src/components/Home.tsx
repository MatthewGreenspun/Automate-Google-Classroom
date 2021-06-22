import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import DescriptionParagraph from "./DescriptionParagraph";
import ClassroomAnimation from "./ClassroomAnimation";
import HomePageBanner from "./HomePageBanner";

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" bgcolor="secondary">
      <HomePageBanner />
      <Box width="100%" maxWidth="800px" margin="0 auto">
        <ClassroomAnimation />
      </Box>
      <DescriptionParagraph />
      <Box height="4em" bgcolor={theme.palette.primary.main}></Box>
    </Box>
  );
};

export default Home;
