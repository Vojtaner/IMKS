import { useSliderActionsContext } from "../../../../contextAPI/sliderActionsContext";
import SliderWithInput from "../../../app/SliderWithInput";

export function LightSlider() {
  const {
    actions: { updateSliderIntensity },
    data: { sliderIntensity },
  } = useSliderActionsContext();

  return (
    <SliderWithInput
      onSliderValueChange={(value) => updateSliderIntensity(value)}
      value={sliderIntensity}
    />
  );
}
