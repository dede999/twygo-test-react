import {
  SimpleGrid,
  Box,
  Button,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import CourseDrawer from "../CourseDrawer";

export default function Title() {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <SimpleGrid columns={2} spacing={10} alignItems="center">
        <Box>
          <Heading as="h1" size="2xl" textAlign="center" color="purple.800">
            Plataforma de Cursos
          </Heading>
        </Box>
        <Box textAlign="right">
          <Button colorScheme="purple" mr={16} onClick={onOpen}>
            Add Course
          </Button>
        </Box>
      </SimpleGrid>
      <CourseDrawer
        isOpen={isOpen}
        onClose={onClose}
        editMode={true}
        completeEdition={() => {}}
      />
    </>
  );
}
