import { ReactNode } from "react";
import { useSliderActions } from "../hooks/sliderHooks";
import { createContext } from "./contextApiFactory";
import React from "react";

export type SliderActionType = {
  actions: {
    duplicateSlider: () => void;
    addNewSlider: () => void;
    deleteSlider: () => void;
    updateSliderTime: (time: string) => void;
    updateSliderIntensity: (intensity: number) => void;
  };
  data: { sliderTime?: string; sliderIntensity?: number };
};

export const [useContext, ContextProvider] = createContext<SliderActionType>();

export const useSliderActionsContext = () => {
  const sliderActions = useContext();

  if (!sliderActions) {
    throw new Error(
      "useSliderActionContext must be used with in a SliderActionContext (wrapped around <LightSettingsList/>"
    );
  }
  return {
    ...sliderActions,
  };
};

export const SliderActionsProvider = (props: {
  channelId: number;
  sliderId: number;
  children: ReactNode;
}) => {
  const sliderActions = useSliderActions(props.channelId, props.sliderId);

  return (
    <ContextProvider value={sliderActions}>{props.children}</ContextProvider>
  );
};
