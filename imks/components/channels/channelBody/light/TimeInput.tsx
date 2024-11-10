import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useSliderActionsContext } from "../../../../contextAPI/sliderActionsContext";

export const TimeInput = () => {
  const {
    actions: { updateSliderTime },
  } = useSliderActionsContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Čas"
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        ampm={false}
        sx={{ maxWidth: "130px" }}
        onChange={(event) => event && updateSliderTime(event.toDate())}
      />
    </LocalizationProvider>
  );
};
