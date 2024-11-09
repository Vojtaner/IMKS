import { useAppDispatch, useAppSelector } from "../store/storeRedux";

import { SliderActionType } from "../contextAPI/sliderActionsContext";
import {
  setSliderIntensity,
  setSliderTime,
  removeSlider,
  duplicatePreviousSlider,
  addSlider,
} from "../store/slices/channelsSlice";
import { selectSliderData } from "../store/selectors/channelSelectors";

export const useSliderActions = (
  channelId: number,
  sliderId: number
): SliderActionType => {
  const dispatch = useAppDispatch();

  const duplicateSlider = () => {
    dispatch(duplicatePreviousSlider({ channelId, sliderId }));
  };
  const addNewSlider = () => {
    dispatch(addSlider({ channelId }));
  };

  const deleteSlider = () => {
    dispatch(removeSlider({ channelId, sliderId }));
  };

  const updateSliderTime = (time: string) => {
    dispatch(setSliderTime({ channelId, sliderId, time }));
  };

  const updateSliderIntensity = (intensity: number) => {
    dispatch(setSliderIntensity({ channelId, sliderId, intensity }));
  };

  const slidersData = useAppSelector((state) =>
    selectSliderData(state, channelId)
  );

  const sliderIntensity = slidersData && slidersData[sliderId].intensity;
  const sliderTime = slidersData && slidersData[sliderId].time;

  return {
    actions: {
      duplicateSlider,
      addNewSlider,
      deleteSlider,
      updateSliderTime,
      updateSliderIntensity,
      data: { sliderTime, sliderIntensity },
    },
  };
};
