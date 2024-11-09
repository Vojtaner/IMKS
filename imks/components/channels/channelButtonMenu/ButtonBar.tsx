import { Stack, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Delete } from "@mui/icons-material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { ChannelActionType } from "../../../entity/entity";

const ButtonBar = (props: {
  channelId: number;
  onResetChannel: () => void;
  onAddNewSlider?: () => void;
  channelActionType: ChannelActionType;
  onClearForm: () => void;
}) => {
  // const dispatch = useAppDispatch();

  return (
    <Stack
      display={"flex"}
      justifyContent={"space-between"}
      direction={"row"}
      spacing={"0.5rem"}
    >
      {props.channelActionType === ChannelActionType.Light && (
        <Button
          onClick={() => props.onAddNewSlider?.()}
          startIcon={<AddOutlinedIcon />}
        >
          Přidat bod
        </Button>
      )}
      <Button
        startIcon={<WaterDropIcon />}
        onClick={() => props.onResetChannel()}
      >
        Resetovat kanál
      </Button>
      <Button onClick={() => props.onClearForm()} startIcon={<Delete />}>
        Vymazat nastavení
      </Button>
    </Stack>
  );
};

export default ButtonBar;
