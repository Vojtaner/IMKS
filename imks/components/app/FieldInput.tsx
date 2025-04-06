import { TextField, TextFieldProps } from "@mui/material";
import { imksTheme } from "../../theme/customeTheme";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const FieldInput = (
  props: TextFieldProps & {
    changeTitle: (title: string) => void;
  }
) => {
  const [value, setValue] = useState<TextFieldProps["value"]>(props.value);
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeTitle = (title: string) => {
    setValue(title);
    props.changeTitle(title);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      label={props.label}
      disabled={props.disabled}
      placeholder={props.placeholder}
      value={value}
      onChange={(event) => handleChangeTitle(event.target.value)}
      sx={{
        "& .MuiInputBase-input.Mui-disabled": {
          "&::placeholder": {
            WebkitTextFillColor: imksTheme.palette.secondary.main,
          },
        },
        "& .MuiOutlinedInput-input.Mui-disabled": {
          WebkitTextFillColor: imksTheme.palette.secondary.main,
        },
      }}
      type={showPassword ? "text" : props.type}
      slotProps={{
        input: {
          endAdornment: props.type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default FieldInput;
