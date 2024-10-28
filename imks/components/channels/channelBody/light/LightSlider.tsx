import Slider from "@mui/material/Slider";
import React from "react";
import { styled } from "@mui/material/styles";
import MuiInput from "@mui/material/Input";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";

const Input = styled(MuiInput)`
  width: 42px;
`;

export function LightSlider() {
  const [value, setValue] = React.useState(30);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
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
        aria-labelledby="input-slider"
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Input
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
