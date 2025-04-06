import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

export const CheckBoxButton = (props: {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}) => {
  const { isChecked, onChange, label } = props;

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={onChange}
          sx={{ padding: "0px 10px 0px 0px " }}
        />
      }
      label={label}
    />
  );
};
