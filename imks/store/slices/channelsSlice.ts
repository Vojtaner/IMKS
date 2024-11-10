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
  allIds: [1, 2],
  lastIncrementedId: 2,
  slidersData: {
    1: { sliderId: 1, intensity: 20, time: new Date() },
    2: { sliderId: 2, intensity: 20, time: new Date() },
  },
};

const initialFertilizeSettings: FertilizeFormType = {
  channelActionType: ChannelActionType.Fertilize,
  time: new Date(),
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
    removeSlider(
      state,
      action: PayloadAction<{ channelId: number; sliderId: number }>
    ) {
      const { channelId, sliderId } = action.payload;

      if (isLightChannel(state[channelId])) {
        if (sliderId >= 1) {
          delete state[channelId].slidersData[sliderId];
          state[channelId].allIds = state[channelId].allIds.filter(
            (id) => id !== sliderId
          );
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
    addSlider(state, action: PayloadAction<{ channelId: number }>) {
      const { channelId } = action.payload;

      if (isLightChannel(state[channelId])) {
        const newIncrementedId = state[channelId].lastIncrementedId + 1;
        state[channelId].allIds.push(newIncrementedId);
        state[channelId].lastIncrementedId = newIncrementedId;
        state[channelId].slidersData[newIncrementedId] = {
          intensity: 0,
          time: new Date(),
          sliderId: newIncrementedId,
        };
      }
    },
    setSliderTime(
      state,
      action: PayloadAction<{
        channelId: number;
        sliderId: number;
        time: Date;
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
  removeSlider,
  setSliderIntensity,
  setSliderTime,
  addSlider,
} = channelsSlice.actions;
export default channelsSlice.reducer;
