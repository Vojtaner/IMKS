import { Stack, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Delete, Save } from "@mui/icons-material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { ChannelActionType } from "../../../entity/entity";

const ButtonBar = (props: {
  channelId: number;
  onResetChannel: () => void;
  onSaveChannel: () => void;
  onAddNewSlider?: () => void;
  channelActionType: ChannelActionType;
  onClearForm: () => void;
}) => {
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
      <Button startIcon={<Save />} onClick={() => props.onSaveChannel()}>
        Uložit
      </Button>
      <Button onClick={() => props.onClearForm()} startIcon={<Delete />}>
        Vymazat nastavení
      </Button>
    </Stack>
  );
};

export default ButtonBar;
