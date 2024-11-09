import Slider from "@mui/material/Slider";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiInput from "@mui/material/Input";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import React from "react";

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function SliderWithInput(props: {
  onSliderValueChange: (value: number) => void;
  value: number | undefined;
}) {
  const [value, setValue] = useState<number | undefined>(props.value);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleSliderChange = (_: Event, value: number | number[]) => {
    if (typeof value === "number") {
      setValue(value);
      props.onSliderValueChange(value);
      return;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (typeof value === "number") {
      setValue(value);
      props.onSliderValueChange(value);
      return;
    }
  };

  const handleBlur = () => {
    if (value) {
      if (value < 0) {
        setValue(0);
        props.onSliderValueChange(value);
      } else if (value > 100) {
        setValue(100);
        props.onSliderValueChange(value);
      }
    }
  };

  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ alignItems: "center", padding: "0.5rem" }}
    >
      {!isSmallScreen && <LightModeIcon />}

      <Slider
        value={typeof value === "number" ? value : 0}
        onChange={handleSliderChange}
        onChangeCommitted={handleBlur}
        aria-labelledby="input-slider"
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Input
          type="number"
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
          sx={{
            padding: 0,
            fontSize: "1rem",
            width: "auto",
            color: "#6f6f6f",
            fontWeight: 500,
            ":before": { borderBottom: 0 },
            ":after": { borderBottom: 0 },
          }}
        />
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "#6f6f6f",
          }}
        >
          %
        </Typography>
      </Box>
    </Stack>
  );
}
