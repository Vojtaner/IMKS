import { Grid2, Paper } from "@mui/material";
import { TimeInput } from "./TimeInput";
import { LightSlider } from "./LightSlider";
import { DeleteIcon } from "../../DeleteIcon";
import { DuplicateIcon } from "../../DuplicateIcon";
import { GridButtonIcon } from "../../GridButtonIcon";

export const LightPaperCard = (props: {
  channelId: number;
  sliderId: number;
}) => {
  return (
    <Paper
      sx={{
        margin: "10px 1px",
      }}
      elevation={2}
    >
      <Grid2 container flexGrow={1} alignItems={"center"}>
        <GridButtonIcon size={{ xs: 1, md: 1 }}>
          <DuplicateIcon
            channelId={props.channelId}
            sliderId={props.sliderId}
          />
        </GridButtonIcon>
        <Grid2 spacing={2} size={{ xs: 7, md: "grow" }}>
          <LightSlider channelId={props.channelId} sliderId={props.sliderId} />
        </Grid2>
        <Grid2 size={{ xs: 3, md: "auto" }}>
          <TimeInput />
        </Grid2>
        <GridButtonIcon size={{ xs: 1, md: 1 }}>
          <DeleteIcon channelId={props.channelId} sliderId={props.sliderId} />
        </GridButtonIcon>
      </Grid2>
    </Paper>
  );
};
