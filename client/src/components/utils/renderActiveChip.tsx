import { ChipComponent as Chip } from "../common";

const renderActiveChip = (isActive: boolean) => (
  <Chip
    label={isActive ? 'Activo' : 'Inactivo'}
    bgColor={isActive ? 'blue' : 'red'}
    txtColor="white"
  />
);
export default renderActiveChip
