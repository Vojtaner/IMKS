import {
  LightFormType,
  FertilizeFormType,
  NotSelectedActionTypeForm,
} from "../entity/entity";

export const isLightChannel = (
  channel: LightFormType | FertilizeFormType | NotSelectedActionTypeForm
): channel is LightFormType => {
  return channel.channelActionType === "light";
};

export const isFertilizeChannel = (
  channel: LightFormType | FertilizeFormType | NotSelectedActionTypeForm
): channel is FertilizeFormType => {
  return channel.channelActionType === "light";
};
export const isNotSelectedChannel = (
  channel: LightFormType | FertilizeFormType | NotSelectedActionTypeForm
): channel is FertilizeFormType => {
  return channel.channelActionType === "light";
};
