import { ChannelAccordion } from "../channels/ChannelAccordion";
import { selectChannels } from "../../store/selectors/channelSelectors";
import { useAppSelector } from "../../store/storeRedux";

export const ImksChannels = () => {
  const channels = useAppSelector(selectChannels);

  return Object.entries(channels).map(([, channel]) => (
    <ChannelAccordion channelId={channel.id} key={channel.id} />
  ));
};
