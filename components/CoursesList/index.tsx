import { SimpleGrid } from "@chakra-ui/react";
import CourseDisplay from "../CourseDisplay";
import { useCourseStore } from "../../src/state/courses";

export default function CoursesList() {
  const courses = useCourseStore((state) => state.courses);

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
      {courses.map((course) => (
        <CourseDisplay key={course.id} course={course} />
      ))}
    </SimpleGrid>
  );
}
