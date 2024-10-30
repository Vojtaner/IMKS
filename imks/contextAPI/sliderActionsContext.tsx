import { createContext, ReactNode, useContext } from "react";
import { SliderData } from "../entity/entity";
import { useSliderActions } from "../hooks/sliderHooks";

export type SliderActionType = {
  actions: {
    duplicateSliderBySliderId: (sliderId: number) => void;
    addSliderBySliderId: () => void;
    deleteSliderBySliderId: (sliderId: number) => void;
    updateSliderTimeBySliderId: (sliderId: number, time: string) => void;
    updateSliderIntensityBySliderId: (
      sliderId: number,
      intensity: number
    ) => void;
  };
  slidersData?: Record<number, SliderData>;
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
  return sliderActions;
};

export const SliderActionsProvider = (props: {
  channelId: number;
  children: ReactNode;
}) => {
  const sliderActions = useSliderActions(props.channelId);

  return (
    <SliderActionContext.Provider value={sliderActions}>
      {props.children}
    </SliderActionContext.Provider>
  );
};
