import { ImksState } from "../../entity/entity";

import { ChannelAccordion } from "../channels/ChannelAccordion";

export const ImksChannels = (channels: ImksState["channels"]) => {
  //select all channels z reduxu

  return Object.entries(channels).map(([, channel]) => (
    <ChannelAccordion channelId={channel.id} key={channel.id} />
  ));
};
