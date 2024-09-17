import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { CourseVideo } from "../../src/domain/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons/faCirclePlay";
import { formatTime } from "../../src/helpers/timeMethods";
import {
  faPencil,
  faTrashCan,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useCourseStore } from "../../src/state/courses";

type VideoItemProps = {
  video: CourseVideo;
  courseID: string;
  index: number;
  editMode?: boolean;
};

export default function VideoItem({
  video,
  index,
  editMode,
  courseID,
}: VideoItemProps) {
  const [markedForDeletion, setMarkedForDeletion] = useState(false);
  const [videoEditMode, setVideoEditMode] = useState(false);
  const { deleteVideoFromCourse } = useCourseStore();
  const delVideo = () => {
    deleteVideoFromCourse(courseID, video.id);
    setMarkedForDeletion(false);
  };

  return (
    <Box bgColor="purple.100" my={2} p={4} borderWidth={1} borderRadius={24}>
      <Stack direction="row">
        <Box my="auto" mr={2}>
          {editMode ? (
            <Stack direction="row">
              {!markedForDeletion && (
                <Button
                  colorScheme="purple"
                  variant="ghost"
                  onClick={() => setVideoEditMode(!videoEditMode)}
                >
                  <FontAwesomeIcon
                    size="lg"
                    color={videoEditMode ? "pink.600" : "purple"}
                    icon={faPencil}
                  />
                </Button>
              )}
              {!videoEditMode && (
                <Button
                  onClick={() => setMarkedForDeletion(true)}
                  colorScheme="purple"
                  variant="ghost"
                >
                  <FontAwesomeIcon size="lg" color="purple" icon={faTrashCan} />
                </Button>
              )}
              {markedForDeletion && (
                <>
                  <Button
                    onClick={delVideo}
                    colorScheme="green"
                    variant="ghost"
                  >
                    <FontAwesomeIcon size="lg" icon={faCircleCheck} />
                  </Button>
                  <Button
                    onClick={() => setMarkedForDeletion(false)}
                    colorScheme="red"
                    variant="ghost"
                  >
                    <FontAwesomeIcon size="lg" icon={faCircleXmark} />
                  </Button>
                </>
              )}
            </Stack>
          ) : (
            <FontAwesomeIcon size="lg" icon={faCirclePlay} />
          )}
        </Box>
        <Box>
          <Heading as="h4" size="sm">
            {video.title}
          </Heading>
          <Text>Duration: {formatTime(video.duration)}</Text>
        </Box>
        <Box my="auto" ml="auto">
          <Heading>{index + 1}</Heading>
        </Box>
      </Stack>
    </Box>
  );
}
