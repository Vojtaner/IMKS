import { Grid2, GridSize } from "@mui/material";
import { ReactNode } from "react";

type GridIconButton = {
  children: ReactNode;
  size: GridSize | ResponsiveGridSize;
};

type ResponsiveGridSize = Partial<
  Record<"xs" | "sm" | "md" | "lg" | "xl", GridSize>
>;

export const GridButtonIcon = (props: GridIconButton) => {
  return (
    <Grid2
      size={props.size}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {props.children}
    </Grid2>
  );
};
