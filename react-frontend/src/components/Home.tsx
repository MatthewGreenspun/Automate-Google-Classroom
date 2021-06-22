import { Box } from "@material-ui/core";

import DescriptionParagraph from "./DescriptionParagraph";
import ClassroomAnimation from "./ClassroomAnimation";
import HomePageBanner from "./HomePageBanner";

const Home: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      bgcolor="secondary"
    >
      <HomePageBanner />
      <ClassroomAnimation />
      <DescriptionParagraph />
    </Box>
  );
};

export default Home;
