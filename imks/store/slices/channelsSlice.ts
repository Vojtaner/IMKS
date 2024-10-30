import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChannelActionType,
  LightFormType,
  ImksState,
  FertilizeFormType,
} from "../../entity/entity";
import { initialChannelState } from "../../api/mockdata";
import { isLightChannel } from "../../utils/typeGuards";

const initialState: ImksState["channels"] = initialChannelState;
type channelId = number;

const initialLightSettings: LightFormType = {
  channelActionType: ChannelActionType.Light,
  slidersData: {
    1: { sliderId: 1, intensity: 20, time: "00:00" },
    2: { sliderId: 2, intensity: 20, time: "00:00" },
  },
};

const initialFertilizeSettings: FertilizeFormType = {
  channelActionType: ChannelActionType.Fertilize,
  time: "13:00",
  fertilizerAmount: 20,
  calibrationCoeficient: 2,
  fertilizeCalendar: {
    monday: true,
    tuesday: false,
    wednesday: true,
    thursday: true,
    friday: false,
    saturday: true,
    sunday: true,
  },
};

const channelsSlice = createSlice({
  name: "channelsSlice",
  initialState: initialState,
  reducers: {
    toggleExpandChannel(state, action: PayloadAction<channelId>) {
      const channelId = action.payload;
      const currentExpandState = state[channelId].channelSettings.expanded;
      state[channelId].channelSettings.expanded = !currentExpandState;
    },
    saveChannelTitle(
      state,
      action: PayloadAction<{ title: string; channelId: channelId }>
    ) {
      state[action.payload.channelId].channelSettings.title =
        action.payload.title;
    },
    setChannelActionType(
      state,
      action: PayloadAction<{
        channelActionType: ChannelActionType;
        channelId: channelId;
      }>
    ) {
      const { channelId, channelActionType } = action.payload;

      state[channelId].channelActionType = channelActionType;

      if (channelActionType === "light") {
        state[channelId] = { ...state[channelId], ...initialLightSettings };
      } else if (channelActionType === "fertilize") {
        state[channelId] = { ...state[channelId], ...initialFertilizeSettings };
      }
    },
    resetChannelActionType(state, action: PayloadAction<channelId>) {
      const channelId = action.payload;

      state[channelId] = {
        id: state[channelId].id,
        channelActionType: ChannelActionType.NotSelected,
        channelSettings: { ...state[channelId].channelSettings },
      };
    },
    duplicatePreviousSlider(
      state,
      action: PayloadAction<{ channelId: number; sliderId: number }>
    ) {
      const { channelId } = action.payload;
      if (isLightChannel(state[channelId])) {
        // problém s duplikací na zařazení do objektů, na správné místo, možná je řadit dle času automaticky a nehrotit indexy?
      }
    },
    deleteSlider(
      state,
      action: PayloadAction<{ channelId: number; sliderId: number }>
    ) {
      const { channelId, sliderId } = action.payload;

      if (isLightChannel(state[channelId])) {
        if (sliderId >= 1) {
          delete state[channelId].slidersData[sliderId];
        }
      }
    },
    setSliderIntensity(
      state,
      action: PayloadAction<{
        channelId: number;
        sliderId: number;
        intensity: number;
      }>
    ) {
      const { channelId, sliderId, intensity } = action.payload;

      if (isLightChannel(state[channelId])) {
        state[channelId].slidersData[sliderId].intensity = intensity;
      }
    },
    setSliderTime(
      state,
      action: PayloadAction<{
        channelId: number;
        sliderId: number;
        time: string;
      }>
    ) {
      const { channelId, sliderId, time } = action.payload;

      if (isLightChannel(state[channelId])) {
        state[channelId].slidersData[sliderId].time = time;
      }
    },
  },
});

export const {
  toggleExpandChannel,
  saveChannelTitle,
  setChannelActionType,
  resetChannelActionType,
  duplicatePreviousSlider,
  deleteSlider,
  setSliderIntensity,
  setSliderTime,
} = channelsSlice.actions;
export default channelsSlice.reducer;
