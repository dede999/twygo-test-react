import {
  Menu,
  MenuButton,
  Button,
  Portal,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CourseMenu() {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={
          <FontAwesomeIcon size="xl" icon={faUpRightAndDownLeftFromCenter} />
        }
        colorScheme="purple"
      />
      <Portal>
        <MenuList
          width="fit-content"
          borderColor="purple.400"
          backgroundColor="purple.100"
        >
          <MenuItem fontWeight={600} backgroundColor="purple.100">
            VER
          </MenuItem>
          <MenuItem fontWeight={600} backgroundColor="purple.100">
            EDITAR
          </MenuItem>
          <MenuItem fontWeight={600} background="purple.100" color="red">
            DELETAR
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
}
