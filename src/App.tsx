import "./App.css";
import CoursesList from "../components/CoursesList";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { useCourseStore } from "./state/courses";
import Title from "../components/Title";

function App() {
  const { courses, seedCourses } = useCourseStore((state) => state);

  useEffect(() => {
    console.log(courses);
    if (courses.length == 0) {
      seedCourses();
    }
  });

  return (
    <>
      <ChakraProvider>
        <Title />
        <Box p={6}>
          <CoursesList />
        </Box>
      </ChakraProvider>
    </>
  );
}

export default App;
