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
import { useState } from "react";

export default function CourseDisplsy({ course }: { course: Course }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const buttonSize = { base: "xs", md: "sm", xl: "md" };

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
          <Stack direction="row" mx="auto">
            <Button
              variant="outline"
              disabled
              size={buttonSize}
              width="fit-content"
              colorScheme="purple"
              leftIcon={<FontAwesomeIcon size="xl" icon={faCalendarXmark} />}
            >
              {course.expirationDate.toLocaleDateString()}
            </Button>
            <Button
              variant="outline"
              disabled
              size={buttonSize}
              width="fit-content"
              colorScheme="purple"
              leftIcon={<FontAwesomeIcon size="xl" icon={faCirclePlay} />}
            >
              {course.courseVideos.length}
            </Button>
            <Button
              variant="solid"
              disabled
              size={buttonSize}
              width="fit-content"
              colorScheme="purple"
              onClick={onOpen}
              leftIcon={<FontAwesomeIcon size="xl" icon={faEye} />}
            />
          </Stack>
        </CardFooter>
      </Card>
      <CourseDrawer
        isOpen={isOpen}
        course={course}
        onClose={onClose}
        editMode={editMode}
        completeEdition={() => setEditMode(!editMode)}
      />
    </>
  );
}
