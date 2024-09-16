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
} from "@chakra-ui/react";
import VideoItem from "../VideoItem";
import { Course } from "../../src/mockAPI/types";

type CourseDrawerProps = {
  isOpen: boolean;
  course?: Course;
  onClose: () => void;
};

export default function CourseDrawer({
  isOpen,
  onClose,
  course,
}: CourseDrawerProps) {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={{ lg: "lg", base: "full" }}>
      <DrawerOverlay />
      <DrawerContent color="purple">
        <DrawerCloseButton />
        <DrawerHeader fontSize="xx-large" as="h2">
          {course?.title}
        </DrawerHeader>
        <DrawerBody>
          <Heading size="xx-large" as="h3">
            Descrição
          </Heading>
          <p>{course?.description}</p>
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
                  onClick={() => console.log("Edit Course")}
                >
                  Edit Course
                </Button>
                <Button
                  colorScheme="purple"
                  onClick={() => console.log("Delete Course")}
                >
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
