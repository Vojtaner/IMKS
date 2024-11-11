import { Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper/Paper";
import logo from "../../assets/logo_white.webp";
import LanguageIcon from "@mui/icons-material/Language";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useAppSelector } from "../../store/storeRedux";
import { selectAppLanguage } from "../../store/selectors/settingsSelectors";
import { Languages } from "../../entity/entity";
import WifiSettings from "../headerMenu/WifiSettings";

const HeaderBarMenu = () => {
  const language = useAppSelector(selectAppLanguage);

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
          spacing={4}
          justifyContent="flex-end"
          sx={{ maxHeight: "2.5rem" }}
        >
          <WifiSettings onConfirmSettings={() => alert("Nastavení uloženo")} />
          <Button startIcon={<LanguageIcon />}>{Languages[language]}</Button>
          <Button
            startIcon={<PictureAsPdfIcon />}
            onClick={() =>
              window.open(
                "https://www.imks.cz/user/documents/upload/navody/LED_kontroler/navod_LED_kontroler_V2_02.pdf",
                "_blank"
              )
            }
          >
            Návod
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HeaderBarMenu;
