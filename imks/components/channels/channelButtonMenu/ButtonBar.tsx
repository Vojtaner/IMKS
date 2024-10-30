import { Stack, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Delete } from "@mui/icons-material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { useAppDispatch } from "../../../store/storeRedux";
import { resetChannelActionType } from "../../../store/slices/channelsSlice";

export const ButtonBar = (props: { channelId: number }) => {
  const dispatch = useAppDispatch();

  return (
    <Stack
      display={"flex"}
      justifyContent={"space-between"}
      direction={"row"}
      spacing={"0.5rem"}
    >
      <Button startIcon={<AddOutlinedIcon />}>Přidat bod </Button>
      <Button
        startIcon={<WaterDropIcon />}
        onClick={() => dispatch(resetChannelActionType(props.channelId))}
      >
        Resetovat kanál
      </Button>
      <Button startIcon={<Delete />}>Vymazat nastavení</Button>
    </Stack>
  );
};
