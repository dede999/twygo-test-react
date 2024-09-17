import {
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
  Input,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react";
import VideoItem from "../VideoItem";
import { Course } from "../../src/domain/types";
import { useCourseStore } from "../../src/state/courses";
import { formatTime } from "../../src/helpers/timeMethods";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import classNames from "react-day-picker/style.module.css";

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
  const today = new Date();
  const pickerDefault = course?.expirationDate || today;
  const [month, setMonth] = useState(pickerDefault);
  const [selected, setSelected] = useState<Date | undefined>(pickerDefault);
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
            <>
              <Stack m={4}>
                <Heading size="md" as="h3">
                  Nome
                </Heading>
                <Input
                  placeholder="Entre com o nome do curso"
                  value={course?.title || ""}
                  onChange={(e) =>
                    console.log("Course name changed:", e.target.value)
                  }
                />
                <Heading mt={4} size="xx-large" as="h3">
                  Descrição
                </Heading>
                <Textarea
                  placeholder="Entre com o nome do curso"
                  value={course?.title || ""}
                  onChange={(e) =>
                    console.log("Course name changed:", e.target.value)
                  }
                />
                <Heading mt={4} size="xx-large" as="h3">
                  Data de término
                </Heading>
                <DayPicker
                  mode="single"
                  month={month}
                  onMonthChange={setMonth}
                  selected={selected}
                  onSelect={setSelected}
                  startMonth={today}
                  disabled={{ before: today }}
                  classNames={{
                    ...classNames,
                    selected: "selected-day",
                  }}
                  required
                />

                <SimpleGrid columns={2} my={4} gap={6}>
                  <Button
                    colorScheme="pink"
                    onClick={() => console.log("SALVAR ALTERAÇÕES")}
                  >
                    SALVAR ALTERAÇÕES
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => console.log("DESCARTAR ALTERAÇÕES")}
                  >
                    DESCARTAR ALTERAÇÕES
                  </Button>
                </SimpleGrid>
              </Stack>
            </>
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

          <Heading size="xx-large" mt={6} as="h3">
            Vídeos
          </Heading>
          {course?.courseVideos.map((video, index) => (
            <VideoItem video={video} key={video.id} index={index} />
          ))}
        </DrawerBody>
        <DrawerFooter>
          <Stack width="full">
            {course === undefined ? (
              <Button
                colorScheme="purple"
                onClick={() => console.log("Create Course")}
              >
                Create Course
              </Button>
            ) : (
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
