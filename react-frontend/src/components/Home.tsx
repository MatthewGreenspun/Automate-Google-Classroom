import { Box } from "@material-ui/core";

import DescriptionParagraph from "./DescriptionParagraph";
import ClassroomAnimation from "./ClassroomAnimation";

const Home: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <DescriptionParagraph />
      <ClassroomAnimation />
    </Box>
  );
};

export default Home;
