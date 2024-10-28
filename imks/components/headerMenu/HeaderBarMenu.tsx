import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper/Paper";
import logo from "../../assets/logo.webp";
import LanguageIcon from "@mui/icons-material/Language";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const HeaderBarMenu = () => {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: "1rem",
        backgroundColor: "black",
        margin: "-10px -10px 20px -10px",
        width: "auto",
        maxHeight: "3rem",
        borderRadius: "0px 0px 20px 20px ",
      }}
    >
      <Grid container spacing={2} alignItems={"center"}>
        <Grid size={2}>
          <img
            src={logo}
            alt="Logo"
            style={{ maxWidth: "100px", maxHeight: "3rem" }}
          />
        </Grid>
        <Grid
          size={"grow"}
          container
          spacing={2}
          justifyContent="flex-end"
          sx={{ maxHeight: "2.5rem" }}
        >
          <Button startIcon={<LanguageIcon />}>Jazyk</Button>

          <Button startIcon={<PictureAsPdfIcon />}>Návod ke stažení</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HeaderBarMenu;
