import { LightPaperCard } from "./LightPaperCard";
import { useSliderActionsContext } from "../../../../contextAPI/sliderActionsContext";

export const LightSettingsList = (props: {
  isExpanded: boolean;
  channelId: number;
}) => {
  const { slidersData } = useSliderActionsContext();
  console.log(slidersData);
  return (
    <>
      {props.isExpanded && slidersData
        ? Object.entries(slidersData).map(([, slider]) => (
            <LightPaperCard
              key={slider.sliderId}
              channelId={props.channelId}
              sliderId={slider.sliderId}
            />
          ))
        : null}
    </>
  );
};
