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
  [selectChannels, (_, id: number) => id],
  (channels, id) => {
    const channel = channels[id];
    if (!channel) {
      throw new Error(`Channel with id ${id} does not exist.`);
    }

    if (channel.channelActionType === "light") {
      return channel.slidersData;
    } else {
      throw new Error(
        `Slider data is not available for 'fertilize' channel type.`
      );
    }
  }
);
