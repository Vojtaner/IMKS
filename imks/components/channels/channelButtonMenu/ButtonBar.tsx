import { Stack, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Delete } from "@mui/icons-material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

export const ButtonBar = () => {
  return (
    <Stack
      display={"flex"}
      justifyContent={"space-between"}
      direction={"row"}
      spacing={"0.5rem"}
    >
      <Button startIcon={<AddOutlinedIcon />}>Přidat bod </Button>
      <Button startIcon={<WaterDropIcon />}>Resetovat kanál </Button>
      <Button startIcon={<Delete />}>Vymazat nastavení</Button>
    </Stack>
  );
};
