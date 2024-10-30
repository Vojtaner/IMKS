import useMediaQuery from "@mui/material/useMediaQuery";
import { imksTheme } from "../../theme/customeTheme";
import IconButton from "@mui/material/IconButton";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";
import { useSliderActionsContext } from "../../contextAPI/sliderActionsContext";

export const SliderDuplicateIcon = () => {
  const isExtraSmallScreen = useMediaQuery(imksTheme.breakpoints.up("xs"));
  const {
    actions: { duplicateSliderBySliderId },
  } = useSliderActionsContext();

  return (
    <IconButton aria-label="delete" onClick={duplicateSliderBySliderId}>
      <SubdirectoryArrowLeftIcon
        fontSize={isExtraSmallScreen ? "small" : "large"}
        sx={{
          transform: "rotate(90deg)",
        }}
      />
    </IconButton>
  );
};
