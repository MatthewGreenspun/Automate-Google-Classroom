import { Box } from "@material-ui/core";
import CreateAnnouncement from "./CreateAnnouncement";

const Posts: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center">
      <CreateAnnouncement
        courses={[
          { courseId: "23432124", courseName: "Global History P1" },
          { courseId: "2342379", courseName: "Global History P5" },
        ]}
      />
    </Box>
  );
};

export default Posts;
