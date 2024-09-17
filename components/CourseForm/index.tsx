import { useState } from "react";
import { Course } from "../../src/domain/types";
import {
  Stack,
  Input,
  Textarea,
  Heading,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import classNames from "react-day-picker/style.module.css";
import { useCourseStore } from "../../src/state/courses";
import { ptBR } from "date-fns/locale"

type CourseFormProps = {
  course?: Course;
  onClose: () => void;
};

export default function CourseForm({ course, onClose }: CourseFormProps) {
  const today = new Date();
  const currentCourse = course;
  const [title, setTitle] = useState(currentCourse?.title || "");
  const [description, setDescription] = useState(
    currentCourse?.description || "",
  );
  const [expirationDate, setExpirationDate] = useState(
    currentCourse?.expirationDate || today,
  );
  const [month, setMonth] = useState(expirationDate);
  const { addACourse, editCourse } = useCourseStore(state => state);

  const handleSubmit = () => {
    if (course?.id === undefined) {
      addACourse(title, description, expirationDate);
      onClose();
    } else {
      editCourse(course.id, title, description, expirationDate);
    }
  };

  const handleCancel = () => {
    setTitle(currentCourse?.title || "");
    setDescription(currentCourse?.description || "");
    setExpirationDate(currentCourse?.expirationDate || today);
    setMonth(currentCourse?.expirationDate || today);
  };

  return (
    <Stack m={4}>
      <Heading size="md" as="h3">
        Nome
      </Heading>
      <Input
        placeholder="Entre com o nome do curso"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Heading mt={4} size="xx-large" as="h3">
        Descrição
      </Heading>
      <Textarea
        placeholder="Entre com a descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Heading mt={4} size="xx-large" as="h3">
        Data de término
      </Heading>
      <DayPicker
        mode="single"
        month={month}
        locale={ptBR}
        onMonthChange={setMonth}
        selected={expirationDate}
        onSelect={setExpirationDate}
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
          onClick={handleSubmit}
        >
          SALVAR ALTERAÇÕES
        </Button>
        <Button
          colorScheme="red"
          onClick={handleCancel}
        >
          DESCARTAR ALTERAÇÕES
        </Button>
      </SimpleGrid>
    </Stack>
  );
}
