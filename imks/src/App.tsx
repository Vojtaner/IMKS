import { ThemeProvider } from "@mui/material";
import { imksTheme } from "../theme/customeTheme";

function App() {
  return (
    <ThemeProvider theme={imksTheme}>
      {/* <ChannelAccordion>
        {" "}
        <p>Ahoj</p>
      </ChannelAccordion> */}

      {/* {panels.map((panel) => {
        return <ImksAccordion />;
      })} */}
    </ThemeProvider>
  );
}
export default App;

// tlačítka
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import { Button } from "@mui/material";
// import { Delete } from "@mui/icons-material";
// <Button startIcon={<AddOutlinedIcon />}>Přidat bod </Button>
// <Button startIcon={<Delete />}>Vymazat vše </Button>
