import {
  getAppState,
  useAppDispatch,
  useAppSelector,
} from "../store/storeRedux";

import { SliderActionType } from "../contextAPI/sliderActionsContext";
import {
  setSliderIntensity,
  setSliderTime,
  removeSlider,
  duplicatePreviousSlider,
  addSlider,
} from "../store/slices/channelsSlice";
import { selectSliderData } from "../store/selectors/channelSelectors";
import { cyan } from "@mui/material/colors";
import {
  ImksState,
  SliderData,
  ChannelActionType,
  LineChartIntensityData,
} from "../entity/entity";
import { isLightChannel } from "../utils/typeGuards";

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

export const useUpdateLineChart = () => {
  const channels = useAppSelector((state) => state.channels);

  const slidersData = getSlidersData(channels);
  const datesData = getDates(slidersData);
  const intensitySeries = getIntensitySeries(datesData, slidersData);

  return { datesData, intensitySeries };
};

const getSlidersData = (imksChannels: ImksState["channels"]) => {
  const data: Record<number, SliderData[]> = {};

  Object.entries(imksChannels).forEach(([channelId, { channelActionType }]) => {
    const convertedChannelId = parseInt(channelId, 10);

    if (channelActionType === ChannelActionType.Light) {
      if (!data[convertedChannelId]) {
        data[convertedChannelId] = [];
      }

      if (isLightChannel(imksChannels[convertedChannelId])) {
        Object.entries(imksChannels[convertedChannelId].slidersData).forEach(
          ([, entry]) => data[convertedChannelId].push(entry)
        );
      }
    }
  });

  return data;
};

const getDates = (data: Record<number, SliderData[]>) => {
  const allTimes = Array.from(
    new Set(
      Object.values(data)
        .flat()
        .map((entry) => {
          const [hours, minutes] = entry.time.split(":").map(Number);

          const today = new Date();
          today.setHours(hours, minutes, 0, 0);

          return today.getTime();
        })
    )
  )
    .map((time) => new Date(time))
    .sort((a, b) => a.getTime() - b.getTime());

  return allTimes;
};

const getIntensitySeries = (
  allTimes: Date[],
  data: Record<number, SliderData[]>
) => {
  const lineChartData: LineChartIntensityData = {
    2: { color: cyan[500], legendTitle: "Světlo", series: [] },
    3: { color: "#b6cf55", legendTitle: "Hnojení", series: [] },
  };

  allTimes.forEach((time) => {
    Object.entries(data).forEach(([channelId, slidersData]) => {
      const dataPoint = slidersData.find((entry) => {
        const [hours, minutes] = entry.time.split(":").map(Number);

        const today = new Date();
        today.setHours(hours, minutes, 0, 0);

        return today.getTime() === time.getTime();
      });
      const intensity = dataPoint
        ? dataPoint.intensity
        : lineChartData[+channelId].series.slice(-1)[0] || 0;

      lineChartData[+channelId].series.push(intensity);
    });
  });
  return lineChartData;
};
