import {
  Alert,
  AlertIcon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Heading,
  DrawerFooter,
  Stack,
  Button,
} from "@chakra-ui/react";
import VideoItem from "../VideoItem";
import { Course } from "../../src/domain/types";
import { useCourseStore } from "../../src/state/courses";
import { formatTime } from "../../src/helpers/timeMethods";
import CourseForm from "../CourseForm";

type CourseDrawerProps = {
  isOpen: boolean;
  course?: Course;
  editMode?: boolean;
  onClose: () => void;
  completeEdition: () => void;
};

export default function CourseDrawer({
  isOpen,
  onClose,
  course,
  editMode,
  completeEdition,
}: CourseDrawerProps) {
  const { deleteACourse } = useCourseStore((state) => state);
  const totalSeconds = course?.courseVideos.reduce((acc, cur) => {
    return acc + cur.duration;
  }, 0);

  const deleteCurrentCourse = () => {
    deleteACourse(course?.id as string);
    onClose();
  };

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={{ lg: "lg", base: "full" }}>
      <DrawerOverlay />
      <DrawerContent color="purple">
        <DrawerCloseButton />
        <DrawerHeader fontSize="xx-large" as="h2">
          {course === undefined
            ? "Novo Curso"
            : editMode
              ? "Editar Curso"
              : course.title}
        </DrawerHeader>

        <DrawerBody>
          {editMode ? (
            <CourseForm course={course} onClose={onClose} />
          ) : (
            <>
              <Stack m={2}>
                <Heading size="xx-large" as="h3">
                  Descrição
                </Heading>
                <p>{course?.description}</p>

                <br />

                <Heading size="xx-large" as="h3">
                  Dados do curso
                </Heading>
                <p> Duração total: {formatTime(totalSeconds as number)} </p>
                <p>
                  Data de término: {course?.expirationDate.toLocaleDateString()}{" "}
                </p>
              </Stack>
            </>
          )}

          {course?.id ? (
            <Stack m={2}>
              <Heading size="xx-large" as="h3">
                Vídeos
              </Heading>
              {course.courseVideos.map((video, index) => (
                <VideoItem
                  editMode={editMode}
                  key={video.id}
                  video={video}
                  index={index}
                  courseID={course.id as string}
                />
              ))}
            </Stack>
          ) : (
            <Alert
              status="info"
              color="navy"
              variant="left-accent"
              borderRadius="10px"
              fontWeight={600}
            >
              <AlertIcon />
              Vídeos serão adicionados após a criação do curso.
            </Alert>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Stack width="full">
            {course !== undefined && (
              <>
                <Button
                  width="100%"
                  colorScheme="purple"
                  onClick={() => {
                    completeEdition();
                  }}
                >
                  {editMode ? "FINALIZAR EDIÇÃO" : "EDITAR CURSO"}
                </Button>
                <Button colorScheme="purple" onClick={deleteCurrentCourse}>
                  Delete Course
                </Button>
              </>
            )}
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
