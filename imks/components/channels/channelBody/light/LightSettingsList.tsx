import { selectSliderData } from "../../../../store/selectors/channelSelectors";
import { useAppSelector } from "../../../../store/storeRedux";
import { LightPaperCard } from "./LightPaperCard";

export const LightSettingsList = (props: {
  isExpanded: boolean;
  channelId: number;
}) => {
  const slidersData = useAppSelector((state) =>
    selectSliderData(state, props.channelId)
  );

  return (
    <>
      {props.isExpanded
        ? Object.entries(slidersData).map(([, slider]) => (
            <LightPaperCard key={slider.sliderId} />
          ))
        : null}
    </>
  );
};
