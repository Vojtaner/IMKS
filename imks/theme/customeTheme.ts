import { createTheme } from "@mui/material";
import { cyan } from "@mui/material/colors";

export const imksTheme = createTheme({
  palette: {
    primary: cyan,
    secondary: { main: "#b6cf55" },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          background: "white",
          color: cyan[500],
          border: "1px dotted",
          ":hover": {
            color: "#fefefe",
            background: cyan[500],
          },
          textTransform: "none",
          fontWeight: 300,
          fontSize: "0.8rem",
        },
      },
    },
  },
});
