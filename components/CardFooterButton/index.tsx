import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonSize = {
  base: string;
  md: string;
  xl: string;
};

export type CardFooterButtonProps = {
  content: string | number;
  buttonSize: ButtonSize;
  onClick: () => void;
  icon: IconDefinition;
  variant: string;
};

export default function CardFooterButton({
  buttonSize,
  content,
  onClick,
  variant,
  icon,
}: CardFooterButtonProps) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      size={buttonSize}
      width="fit-content"
      colorScheme="purple"
      leftIcon={<FontAwesomeIcon size="xl" icon={icon} />}
    >
      {content}
    </Button>
  );
}
