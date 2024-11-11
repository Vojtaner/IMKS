import WifiIcon from "@mui/icons-material/Wifi";
import { Badge, useMediaQuery, BadgeProps } from "@mui/material";
import { ReactNode, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { DialogWindow } from "../app/DialogWindow";
import WifiForm from "../settings/WifiForm";

const WifiSettings = (props: { onConfirmSettings: () => void }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState<boolean>(true);
  const isConnected = true;
  const { sxProps, badgeContent } = getBadgeInfo(isSmallScreen, isConnected);

  return (
    <>
      <Badge
        badgeContent={badgeContent}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={sxProps}
        onClick={() => setOpen(true)}
      >
        <WifiIcon color="action" sx={{ color: "white" }} fontSize="large" />
      </Badge>
      <DialogWindow
        onClose={() => setOpen(false)}
        id={"deleteDialog"}
        keepMounted={false}
        value={"primary"}
        title={"Nastavení připojení ke kontroleru"}
        open={open}
        handleOk={props.onConfirmSettings}
      >
        <WifiForm />
      </DialogWindow>
    </>
  );
};

export default WifiSettings;

const getBadgeInfo = (
  isSmallScreen: boolean,
  isConnected: boolean
): {
  badgeContent: ReactNode | string;
  sxProps: BadgeProps["sx"];
} => {
  const animationBaseProps = {
    cursor: "pointer",
    "&:hover .MuiBadge-badge": {
      transform: "scale(1.1)", // Slightly increase size on hover
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Elevation effect
    },
  };
  const desktopProps = {
    fontSize: "3rem",
    "& .MuiBadge-badge": {
      padding: "0 8px",
      transform: "translate(15%)",
      transition: "transform 0.3s, box-shadow 0.3s", // Smooth transition for hover effect
    },
    ...animationBaseProps,
  };
  const mobileProps = {
    width: "2.5rem",
    ...animationBaseProps,
  };

  const isDisconnectedProps = {
    "& .MuiBadge-badge": {
      background: "#b10000",
    },
  };

  const isConnectedProps = {
    "& .MuiBadge-badge": {
      background: "#b6cf50",
    },
  };

  if (isSmallScreen) {
    if (isConnected) {
      return {
        badgeContent: <DoneIcon fontSize="small" />,
        sxProps: {
          ...mobileProps,
          ...isConnectedProps,
        },
      };
    }

    return {
      badgeContent: <CloseIcon fontSize="small" />,
      sxProps: {
        ...mobileProps,
        color: "#ffffff",
        ...isDisconnectedProps,
      },
    };
  }

  return isConnected
    ? {
        badgeContent: "Připojeno",
        sxProps: {
          ...desktopProps,
          width: "5.3rem",
          "& .MuiBadge-badge": {
            ...desktopProps["& .MuiBadge-badge"],
            ...isConnectedProps["& .MuiBadge-badge"],
          },
        },
      }
    : {
        badgeContent: "Zde připojte",
        sxProps: {
          ...desktopProps,
          color: "#ffffff",
          width: "6rem",
          "& .MuiBadge-badge": {
            ...desktopProps["& .MuiBadge-badge"],
            ...isDisconnectedProps["& .MuiBadge-badge"],
          },
        },
      };
};
