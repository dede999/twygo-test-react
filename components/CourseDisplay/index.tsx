import {
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
import { faCalendarXmark } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons/faCirclePlay";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import CourseDrawer from "../CourseDrawer";
import CardFooterButton, { CardFooterButtonProps } from "../CardFooterButton";
import { useState } from "react";

export default function CourseDisplsy({ course }: { course: Course }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const buttonSize = { base: "xs", md: "sm", xl: "md" };
  const footerButtons = [
    {
      variant: "outline",
      onClick: () => {},
      icon: faCalendarXmark,
      content: course.expirationDate.toLocaleDateString(),
    },
    {
      variant: "outline",
      onClick: () => {},
      icon: faCirclePlay,
      content: course.courseVideos.length,
    },
    {
      variant: "solid",
      onClick: onOpen,
      icon: faEye,
      content: "",
    },
  ];

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
            {footerButtons.map(
              (
                button: Omit<CardFooterButtonProps, "buttonSize">,
                index: number,
              ) => (
                <CardFooterButton
                  content={button.content}
                  onClick={button.onClick}
                  buttonSize={buttonSize}
                  variant={button.variant}
                  icon={button.icon}
                  key={index}
                />
              ),
            )}
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
