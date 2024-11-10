import { createContext, ReactNode, useContext } from "react";
import { useSliderActions } from "../hooks/sliderHooks";

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

export const SliderActionContext = createContext<SliderActionType | undefined>(
  undefined
);

export const useSliderActionsContext = () => {
  const sliderActions = useContext(SliderActionContext);

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
    <SliderActionContext.Provider value={sliderActions}>
      {props.children}
    </SliderActionContext.Provider>
  );
};
