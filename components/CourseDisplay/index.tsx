import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Course } from "../../src/mockAPI/types";

export default function CourseDisplsy({ course }: { course: Course }) {
  return (
    <Card p={4} borderWidth={2} borderRadius={4} overflow="hidden">
      <CardHeader>
        <Heading as="h3" size="md">
          {course.title}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>{course.description}</Text>
      </CardBody>
      <CardFooter>
        <Text>
          Expiration Date: {course.expirationDate.toLocaleDateString()}
        </Text>
        <Text>Number of Videos: {course.courseVideos.length}</Text>
      </CardFooter>
    </Card>
  );
}
