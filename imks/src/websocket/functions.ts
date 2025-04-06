type InitialMessage = {
  type: string;
  Datum_UNIX: number;
};

export const createInitialMessage = (): InitialMessage => ({
  type: "update_Zarizeni_Time",
  Datum_UNIX: Math.floor(Date.now() / 1000),
});

export const timeStringToFloat = (time: string): number => {
  const [hoursStr, minutesStr] = time.split(":");
  const hours = parseInt(hoursStr.trim(), 10);
  const minutes = parseInt(minutesStr.trim(), 10);
  return hours + minutes / 60;
};

export const floatToTimeString = (floatTime: number): string => {
  const hours = Math.floor(floatTime);
  const minutes = Math.round((floatTime - hours) * 60);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};
