import {
  LightFormType,
  FertilizeFormType,
  NotSelectedActionTypeForm,
  ChannelActionType,
} from "../entity/entity";

export const isLightChannel = (
  channel: LightFormType | FertilizeFormType | NotSelectedActionTypeForm
): channel is LightFormType => {
  return channel.channelActionType === ChannelActionType.Light;
};

export const isFertilizeChannel = (
  channel: LightFormType | FertilizeFormType | NotSelectedActionTypeForm
): channel is FertilizeFormType => {
  return channel.channelActionType === ChannelActionType.Fertilize;
};
export const isNotSelectedChannel = (
  channel: LightFormType | FertilizeFormType | NotSelectedActionTypeForm
): channel is NotSelectedActionTypeForm => {
  return channel.channelActionType === ChannelActionType.NotSelected;
};
