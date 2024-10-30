import { useAppDispatch, useAppSelector } from "../store/storeRedux";

import { SliderActionType } from "../contextAPI/sliderActionsContext";
import {
  duplicatePreviousSlider,
  setSliderIntensity,
  setSliderTime,
} from "../store/slices/channelsSlice";
import { selectSliderData } from "../store/selectors/channelSelectors";

export const useSliderActions = (
  channelId: number,
  sliderId: number
): SliderActionType => {
  const dispatch = useAppDispatch();

  const duplicateSliderBySliderId = () => {
    dispatch(duplicatePreviousSlider({ channelId, sliderId }));
  };
  const addSliderBySliderId = () => {};
  const deleteSliderBySliderId = () => {
    dispatch(duplicatePreviousSlider({ channelId, sliderId }));
  };
  const updateSliderTimeBySliderId = (time: string) => {
    dispatch(setSliderTime({ channelId, sliderId, time }));
  };
  const updateSliderIntensityBySliderId = (intensity: number) => {
    dispatch(setSliderIntensity({ channelId, sliderId, intensity }));
  };

  const slidersData = useAppSelector((state) =>
    selectSliderData(state, channelId)
  );

  const sliderIntensity = slidersData && slidersData[sliderId].intensity;
  const sliderTime = slidersData && slidersData[sliderId].time;

  return {
    actions: {
      duplicateSliderBySliderId,
      addSliderBySliderId,
      deleteSliderBySliderId,
      updateSliderTimeBySliderId,
      updateSliderIntensityBySliderId,
      data: { sliderTime, sliderIntensity },
    },
  };
};
