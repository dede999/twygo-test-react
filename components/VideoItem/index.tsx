import {
  Box,
  Button,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
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
  video?: CourseVideo;
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
  const { deleteVideoFromCourse, addVideoToCourse, editVideoInCourse } =
    useCourseStore();
  const [videoTitle, setVideoTitle] = useState(video?.title || "");
  const [videoDuration, setVideoDuration] = useState(video?.duration || 0);
  const [videoURL, setVideoURL] = useState(video?.url || "");
  const [videoIndex, setVideoIndex] = useState(index);
  const delVideo = () => {
    deleteVideoFromCourse(courseID, video?.id as string);
    setMarkedForDeletion(false);
  };
  const handleSubmit = () => {
    if (video) {
      editVideoInCourse(
        courseID,
        video.id,
        videoURL,
        videoTitle,
        videoDuration,
      );
    } else {
      addVideoToCourse(
        courseID,
        videoURL,
        videoTitle,
        videoDuration,
        videoIndex,
      );
    }
    setVideoEditMode(false);
  };
  const handleCancel = () => {
    setVideoTitle(video?.title || "");
    setVideoDuration(video?.duration || 0);
    setVideoURL(video?.url || "");
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
        {videoEditMode ? (
          <Stack width="85%">
            <Heading size="sm">Nome</Heading>
            <Input
              borderColor="purple"
              borderWidth={2}
              borderBottomWidth={3}
              placeholder="Entre com o nome do vídeo"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
            <SimpleGrid mt={2} columns={{ md: 5, base: 1 }} spacing={2}>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Heading size="sm">Duração (em segundos)</Heading>
                <Input
                  borderColor="purple"
                  borderWidth={2}
                  borderBottomWidth={3}
                  placeholder="Entre com a duração do vídeo"
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(Number(e.target.value))}
                />
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <Heading size="sm">URL</Heading>
                <Input
                  borderColor="purple"
                  borderWidth={2}
                  borderBottomWidth={3}
                  placeholder="Entre com a URL do vídeo"
                  value={videoURL}
                  onChange={(e) => setVideoURL(e.target.value)}
                />
              </GridItem>
              <GridItem colSpan={{ base: 1, md: 1 }}>
                <Heading size="sm"> Ordem </Heading>
                <Input
                  disabled={video ? true : false}
                  borderColor="purple"
                  borderWidth={2}
                  borderBottomWidth={3}
                  placeholder="Entre com a URL do vídeo"
                  value={videoIndex}
                  onChange={(e) => setVideoIndex(Number(e.target.value))}
                />
              </GridItem>
            </SimpleGrid>
            <SimpleGrid mt={2} columns={{ md: 2, base: 1 }} spacing={2}>
              <Button colorScheme="pink" onClick={handleSubmit}>
                SALVAR ALTERAÇÕES
              </Button>
              <Button colorScheme="red" onClick={handleCancel}>
                DESCARTAR ALTERAÇÕES
              </Button>
            </SimpleGrid>
          </Stack>
        ) : (
          <>
            <Box>
              <Heading as="h4" size="sm">
                {video?.title}
              </Heading>
              <Text>Duration: {formatTime(video?.duration as number)}</Text>
            </Box>
            <Box my="auto" ml="auto">
              <Heading>{index + 1}</Heading>
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
}
