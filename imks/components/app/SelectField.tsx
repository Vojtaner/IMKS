import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";

const SelectField = (
  props: TextFieldProps & {
    options: { id: string; name: string }[];
    selectedValue: string;
  }
) => {
  const [value, setValue] = useState(props.selectedValue);

  return (
    <TextField
      id={props.id}
      select
      label={props.label}
      helperText={props.helperText}
      value={value ?? ""}
    >
      {props.options.map((option) => (
        <MenuItem
          key={option.id}
          value={option.id}
          onClick={() => setValue(option.id)}
        >
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;
