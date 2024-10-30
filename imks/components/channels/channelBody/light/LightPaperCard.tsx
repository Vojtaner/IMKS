import { Grid2, Paper } from "@mui/material";
import { TimeInput } from "./TimeInput";
import { LightSlider } from "./LightSlider";
import SliderDeleteIcon from "../../SliderDeleteIcon";
import { SliderDuplicateIcon } from "../../DuplicateIcon";
import { GridButtonIcon } from "../../GridButtonIcon";

export const LightPaperCard = () => {
  return (
    <Paper
      sx={{
        margin: "10px 1px",
      }}
      elevation={2}
    >
      <Grid2 container flexGrow={1} alignItems={"center"}>
        <GridButtonIcon size={{ xs: 1, md: 1 }}>
          <SliderDuplicateIcon />
        </GridButtonIcon>
        <Grid2 spacing={2} size={{ xs: 7, md: "grow" }}>
          <LightSlider />
        </Grid2>
        <Grid2 size={{ xs: 3, md: "auto" }}>
          <TimeInput />
        </Grid2>
        <GridButtonIcon size={{ xs: 1, md: 1 }}>
          <SliderDeleteIcon />
        </GridButtonIcon>
      </Grid2>
    </Paper>
  );
};
