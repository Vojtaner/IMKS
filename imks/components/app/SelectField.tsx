import { MenuItem, TextField, TextFieldProps } from "@mui/material";

const SelectField = (
  props: TextFieldProps & { options: { id: string; name: string }[] }
) => {
  return (
    <TextField
      id={props.id}
      select
      label={props.label}
      defaultValue={props.options[0].id}
      helperText={props.helperText}
    >
      {props.options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;
