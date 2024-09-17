import { useState } from "react";
import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import VideoForm from "../VideoForm";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type NewVideoProps = {
  courseID: string;
};

export default function NewVideo({ courseID }: NewVideoProps) {
  const [displayForm, setDisplayForm] = useState(false);

  return displayForm ? (
    <Box bgColor="purple.100" m={2} p={4} borderWidth={1} borderRadius={24}>
      <VideoForm mx="auto" setVideoEditMode={setDisplayForm} courseID={courseID} />
    </Box>
  ) : (
    <Box bgColor="purple.100" m={2} p={4} borderWidth={1} borderRadius={24}>
      <Stack direction="row" align="center">
        <Button
          colorScheme="purple"
          variant="ghost"
          onClick={() => setDisplayForm(!displayForm)}
        >
          <FontAwesomeIcon
            size="lg"
            color={displayForm ? "pink.600" : "purple"}
            icon={faPlus}
          />
        </Button>
        <Heading size="md">Adicionar novo vídeo</Heading>
      </Stack>
    </Box>
  );
}
