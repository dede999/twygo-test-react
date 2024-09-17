import { useState } from "react";
import { CourseVideo } from "../../src/domain/types";
import { useCourseStore } from "../../src/state/courses";
import {
  Button,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  GridItem,
} from "@chakra-ui/react";

type VideoFormProps = {
  video?: CourseVideo;
  courseID: string;
  setVideoEditMode: (signal: boolean) => void;
};

export default function VideoForm({
  video,
  setVideoEditMode,
  courseID,
}: VideoFormProps) {
  const { addVideoToCourse, editVideoInCourse } = useCourseStore();
  const [videoTitle, setVideoTitle] = useState(video?.title || "");
  const [videoDuration, setVideoDuration] = useState(video?.duration || 0);
  const [videoURL, setVideoURL] = useState(video?.url || "");
  const [videoIndex, setVideoIndex] = useState(0);

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
  );
}
