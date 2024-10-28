import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImksState } from "../../entity/entity";
import { initialChannelState } from "../../api/mockdata";

const initialState: ImksState["channels"] = initialChannelState;

const channelsSlice = createSlice({
  name: "channelsSlice",
  initialState: initialState,
  reducers: {
    toggleExpandChannel(state, action: PayloadAction<number>) {
      const channelId = action.payload;
      const currentExpandState = state[channelId].channelSettings.expanded;
      state[channelId].channelSettings.expanded = !currentExpandState;
    },
  },
});

export const { toggleExpandChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
