import { Stack, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Delete } from "@mui/icons-material";

export const ButtonBar = () => {
  return (
    <Stack display={"flex"} justifyContent={"space-between"} direction={"row"}>
      <Button startIcon={<AddOutlinedIcon />}>Přidat bod </Button>
      <Button startIcon={<Delete />}>Vymazat vše </Button>
    </Stack>
  );
};
