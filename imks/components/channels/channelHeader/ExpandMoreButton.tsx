import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const ExpandMoreButton = (props: { channelId: number }) => {
  // změnit expand ve formu REDUX handleChangeExpnaded
  const handleChangeExpnaded = (x: number) => {
    console.log(x);
  };

  return (
    <IconButton
      sx={{ p: "10px" }}
      aria-label="expand-arrow"
      onClick={() => handleChangeExpnaded(props.channelId)}
    >
      <ExpandMoreIcon />
    </IconButton>
  );
};
