import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Course } from "../../src/mockAPI/types";
import { faCalendarXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons/faCirclePlay";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons/faUpRightAndDownLeftFromCenter";

export default function CourseDisplsy({ course }: { course: Course }) {
  return (
    <Card
      p={4}
      borderWidth={1}
      borderBottomWidth={3}
      borderRadius={24}
      overflow="hidden"
      className="course-card"
      borderColor="purple.400"
    >
      <CardHeader>
        <Heading as="h3" size="md">
          {course.title}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>{course.description}</Text>
      </CardBody>
      <CardFooter>
        <Stack direction="row">
          <Button
            variant="outline"
            disabled
            width="fit-content"
            colorScheme="purple"
            leftIcon={<FontAwesomeIcon size="xl" icon={faCalendarXmark} />}
          >
            {course.expirationDate.toLocaleDateString()}
          </Button>
          <Button
            variant="outline"
            disabled
            width="fit-content"
            colorScheme="purple"
            leftIcon={<FontAwesomeIcon size="xl" icon={faCirclePlay} />}
          >
            {course.courseVideos.length}
          </Button>
          <Button
            variant="outline"
            disabled
            width="fit-content"
            colorScheme="pink"
            leftIcon={
              <FontAwesomeIcon
                size="xl"
                icon={faUpRightAndDownLeftFromCenter}
              />
            }
          />
        </Stack>
      </CardFooter>
    </Card>
  );
}
