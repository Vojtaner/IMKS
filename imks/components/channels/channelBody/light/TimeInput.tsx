import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useSliderActionsContext } from "../../../../contextAPI/sliderActionsContext";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const getParsedTime = (time: string | undefined) => {
  if (!time) return;
  const hours = time && parseInt(time && time.split(":")[0], 10);
  const minutes = time && parseInt(time && time.split(":")[1], 10);

  if (typeof hours === "number" && typeof minutes === "number") {
    const dateWithTime = dayjs()
      .set("hour", hours)
      .set("minute", minutes)
      .set("second", 0)
      .set("millisecond", 0);
    return dateWithTime;
  }
};

export const TimeInput = () => {
  const {
    actions: { updateSliderTime },
    data: { sliderTime },
  } = useSliderActionsContext();

  const [time, setTime] = useState<Dayjs | undefined>(
    getParsedTime(sliderTime)
  );

  const handleChangeTime = (time: string) => {
    const parsedTime = getParsedTime(time);
    setTime(parsedTime);
    console.log(time);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Čas"
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
        value={time}
        ampm={false}
        sx={{ maxWidth: "130px" }}
        onChange={(event) => {
          if (!event) return;
          const timeString = `${event.hour()}:${event.minute()}`;
          handleChangeTime(timeString);
          updateSliderTime(timeString);
        }}
      />
    </LocalizationProvider>
  );
};
