import { LightPaperCard } from "./LightPaperCard";
import { SliderActionsProvider } from "../../../../contextAPI/sliderActionsContext";
import { useAppSelector } from "../../../../store/storeRedux";
import { selectSliderData } from "../../../../store/selectors/channelSelectors";

export const LightSettingsList = (props: {
  isExpanded: boolean;
  channelId: number;
}) => {
  const { channelId } = props;
  const slidersData = useAppSelector((state) =>
    selectSliderData(state, channelId)
  );
  return (
    <>
      {props.isExpanded && slidersData
        ? Object.entries(slidersData).map(([, slider]) => (
            <SliderActionsProvider
              channelId={props.channelId}
              sliderId={slider.sliderId}
              key={slider.sliderId}
            >
              <LightPaperCard key={slider.sliderId} />
            </SliderActionsProvider>
          ))
        : null}
    </>
  );
};
