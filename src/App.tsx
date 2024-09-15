import "./App.css";
import CoursesList from "../components/CoursesList";
import { Box, ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <>
      <ChakraProvider>
        <Box p={6}>
          <CoursesList />
        </Box>
      </ChakraProvider>
    </>
  );
}

export default App;
