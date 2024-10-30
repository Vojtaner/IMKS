import { useAppDispatch, useAppSelector } from "../store/storeRedux";

import { SliderActionType } from "../contextAPI/sliderActionsContext";
import {
  duplicatePreviousSlider,
  setSliderIntensity,
  setSliderTime,
} from "../store/slices/channelsSlice";
import { selectSliderData } from "../store/selectors/channelSelectors";

export const useSliderActions = (channelId: number): SliderActionType => {
  const dispatch = useAppDispatch();

  const duplicateSliderBySliderId = (sliderId: number) => {
    dispatch(duplicatePreviousSlider({ channelId, sliderId }));
  };
  const addSliderBySliderId = () => {};
  const deleteSliderBySliderId = (sliderId: number) => {
    dispatch(duplicatePreviousSlider({ channelId, sliderId }));
  };
  const updateSliderTimeBySliderId = (sliderId: number, time: string) => {
    dispatch(setSliderTime({ channelId, sliderId, time }));
  };
  const updateSliderIntensityBySliderId = (
    sliderId: number,
    intensity: number
  ) => {
    dispatch(setSliderIntensity({ channelId, sliderId, intensity }));
  };
  const slidersData = useAppSelector((state) =>
    selectSliderData(state, channelId)
  );

  return {
    actions: {
      duplicateSliderBySliderId,
      addSliderBySliderId,
      deleteSliderBySliderId,
      updateSliderTimeBySliderId,
      updateSliderIntensityBySliderId,
    },
    slidersData,
  };
};
