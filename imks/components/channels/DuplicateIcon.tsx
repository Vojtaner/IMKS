import useMediaQuery from "@mui/material/useMediaQuery";
import { imksTheme } from "../../theme/customeTheme";
import IconButton from "@mui/material/IconButton";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";
import { useAppDispatch } from "../../store/storeRedux";
import { duplicatePreviousSlider } from "../../store/slices/channelsSlice";

export const DuplicateIcon = (props: {
  channelId: number;
  sliderId: number;
}) => {
  const { channelId, sliderId } = props;
  const isExtraSmallScreen = useMediaQuery(imksTheme.breakpoints.up("xs"));
  const dispatch = useAppDispatch();

  return (
    <IconButton
      aria-label="delete"
      onClick={() =>
        dispatch(
          duplicatePreviousSlider({
            channelId,
            sliderId,
          })
        )
      }
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
