import { SimpleGrid } from "@chakra-ui/react";
import CourseDisplay from "../CourseDisplay";
import { courses } from "../../src/mockAPI";

export default function CoursesList() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
      {courses.map((course) => (
        <CourseDisplay key={course.id} course={course} />
      ))}
    </SimpleGrid>
  );
}
