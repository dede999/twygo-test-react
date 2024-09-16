import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Course } from "../../src/domain/types";
// import CourseMenu from "../CourseMenu";
import { faCalendarXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons/faCirclePlay";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import CourseDrawer from "../CourseDrawer";

export default function CourseDisplsy({ course }: { course: Course }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
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
              variant="solid"
              disabled
              width="fit-content"
              colorScheme="purple"
              onClick={onOpen}
              leftIcon={<FontAwesomeIcon size="xl" icon={faEye} />}
            />
          </Stack>
        </CardFooter>
      </Card>
      <CourseDrawer isOpen={isOpen} course={course} onClose={onClose} />
    </>
  );
}
