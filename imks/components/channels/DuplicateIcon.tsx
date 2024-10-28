import useMediaQuery from "@mui/material/useMediaQuery";
import { imksTheme } from "../../theme/customeTheme";
import IconButton from "@mui/material/IconButton";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";

export const DuplicateIcon = () => {
  const isExtraSmallScreen = useMediaQuery(imksTheme.breakpoints.up("xs"));

  return (
    <IconButton
      aria-label="delete"
      onClick={() => alert("duplikace předchozího nastavení")}
    >
      <SubdirectoryArrowLeftIcon
        fontSize={isExtraSmallScreen ? "small" : "large"}
        sx={{
          transform: "rotate(90deg)",
        }}
      />
    </IconButton>
  );
};
