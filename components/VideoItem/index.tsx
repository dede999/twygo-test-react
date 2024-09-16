import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { CourseVideo } from "../../src/domain/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons/faCirclePlay";
import { formatTime } from "../../src/helpers/timeMethods";

type VideoItemProps = {
  video: CourseVideo;
  index: number;
};

export default function VideoItem({ video, index }: VideoItemProps) {
  return (
    <Box bgColor="purple.100" my={6} p={4} borderWidth={1} borderRadius={24}>
      <Stack direction="row">
        <Box my="auto">
          <FontAwesomeIcon size="lg" icon={faCirclePlay} />
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
