import { isLightChannel } from "../../utils/typeGuards";
import { AppStoreState, createAppSelector } from "../storeRedux";

export const selectChannels = createAppSelector(
  [(state: AppStoreState) => state.channels],
  (channels) => channels
);

export const selectChannelTitle = createAppSelector(
  [selectChannels, (_, id: number) => id],
  (channels, id) => channels[id].channelSettings.title
);

export const selectChannelActionType = createAppSelector(
  [selectChannels, (_, id: number) => id],
  (channels, id) => channels[id].channelActionType
);

export const selectChannelExpanded = createAppSelector(
  [selectChannels, (_, id: number) => id],
  (channels, id) => channels[id].channelSettings.expanded
);
// export const selectSliderData = createAppSelector(
//   [selectChannels, (_, id: number) => id],
//   (channels, id) => channels[id].channelActionType
// );

export const selectSliderData = createAppSelector(
  [selectChannels, (_, channelId: number) => channelId],
  (channels, channelId) => {
    const channel = channels[channelId];

    if (isLightChannel(channel)) {
      return channel.slidersData;
    }
  }
);
