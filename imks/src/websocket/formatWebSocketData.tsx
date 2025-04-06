import dayjs from "dayjs";
import {
  AccessibleWifiType,
  ChannelActionType,
  ChannelForm,
  FertilizeFormType,
  LightFormType,
  NotSelectedActionTypeForm,
  SliderData,
  WifiForm,
} from "../../entity/entity";
import { floatToTimeString } from "./functions";
import {
  KanalRezim,
  KanalRezimNastaveni,
  OsvetleniBod,
  WebSocketRequestTypes,
  ZarizeniNastaveni,
} from "./webSocket";
import {
  SignalWifi0Bar,
  SignalWifi1Bar,
  SignalWifi2Bar,
  SignalWifi3Bar,
  SignalWifi4Bar,
} from "@mui/icons-material";
import { isFertilizeChannel, isLightChannel } from "../../utils/typeGuards";

export const useFormatSliderData = () => {
  const formatToWebSocketData = (
    slidersData: Record<number, SliderData>
  ): OsvetleniBod[] => {
    return Object.values(slidersData)
      .map(({ time, intensity }) => {
        const [hours, minutes] = time.split(":").map(Number);
        const floatTime = hours + minutes / 60;
        return { Cas: floatTime, Intenzita: intensity };
      })
      .sort((a, b) => a.Cas - b.Cas);
  };

  const formatToWebAppData = (
    sortedLightingDataList: OsvetleniBod[]
  ): Record<number, SliderData> => {
    const sliderDataObject: Record<number, SliderData> = {};
    sortedLightingDataList.forEach((lightingData, index) => {
      const orderNumber = index + 1;
      if (!sliderDataObject[orderNumber]) {
        sliderDataObject[orderNumber] = {
          sliderId: orderNumber,
          intensity: lightingData.Intenzita,
          time: floatToTimeString(lightingData.Cas),
        };
      }
    });
    return sliderDataObject;
  };

  return { formatToWebSocketData, formatToWebAppData };
};

const isLightChannelWebSocketType = (
  channelSettings: KanalRezim
): channelSettings is KanalRezim.Light => {
  return channelSettings === KanalRezim.Light;
};
const isFertilizeChannelWebSocketType = (
  channelSettings: KanalRezim
): channelSettings is KanalRezim.Fertilize => {
  return channelSettings === KanalRezim.Fertilize;
};
const isNotSelectedChannelWebSocketType = (
  channelSettings: KanalRezim
): channelSettings is KanalRezim.NotSelected => {
  return channelSettings === KanalRezim.NotSelected;
};

export const useFormatWebSocketChannelsData = () => {
  const { formatToWebAppData, formatToWebSocketData } = useFormatSliderData();

  const formatDataToWebApp = (
    channelsSettings: KanalRezimNastaveni[]
  ): Record<number, ChannelForm> => {
    const channelsSettingsState: Record<number, ChannelForm> = {};

    channelsSettings.forEach((channelSettings, index) => {
      const slidersData = formatToWebAppData(channelSettings.Osvetleni_Body);
      const allIds = Object.keys(slidersData).map(Number);
      const id = index;

      if (isLightChannelWebSocketType(channelSettings.Kanal_Rezim)) {
        channelsSettingsState[id] = getConvertedLightChannel(
          channelSettings,
          id,
          slidersData,
          allIds
        );
      }

      if (isFertilizeChannelWebSocketType(channelSettings.Kanal_Rezim)) {
        channelsSettingsState[id] = getConvertedFertilizeChannel(
          channelSettings,
          id
        );
      }

      if (isNotSelectedChannelWebSocketType(channelSettings.Kanal_Rezim)) {
        channelsSettingsState[id] = getConvertedNotSelectedChannel(
          channelSettings,
          id
        );
      }
    });

    return channelsSettingsState;
  };

  const formatDateFromAppToWebSocket = (
    channels: Record<number, ChannelForm>
  ): KanalRezimNastaveni[] => {
    const channelsKeys = Object.entries(channels);

    const channelsWebSocket: KanalRezimNastaveni[] = channelsKeys.map(
      ([key, channelForm]) => {
        if (isLightChannel(channelForm)) {
          return {
            Kanal_Nazev: channelForm.channelSettings.title,
            Hnojeni_Cas: 0,
            Identifikator: WebSocketRequestTypes.FetchChannelSettings,
            Kanal_Cislo: Number(key),
            Kanal_Rezim: KanalRezim.Light,
            Hnojeni_Rezim: 0,
            Hnojeni_Mnozstvi: 0,
            Hnojeni_KalibracniKoeficient: 0,
            Hnojeni_DenPoslednihoHnojeni: 0,
            Hnojeni_DnyHnojeni: [true, false, false, true, false, false],
            Osvetleni_Body: formatToWebSocketData(channelForm.slidersData),
          };
        }
        if (isFertilizeChannel(channelForm)) {
          return {
            Kanal_Nazev: channelForm.channelSettings.title,
            Hnojeni_Cas: 0,
            Identifikator: WebSocketRequestTypes.FetchChannelSettings,
            Kanal_Cislo: Number(key),
            Kanal_Rezim: KanalRezim.Light,
            Hnojeni_Rezim: 0,
            Hnojeni_Mnozstvi: 0,
            Hnojeni_KalibracniKoeficient: 0,
            Hnojeni_DenPoslednihoHnojeni: 0,
            Hnojeni_DnyHnojeni: [true, false, false, true, false, false],
            Osvetleni_Body: [],
          };
        }

        return {
          Kanal_Nazev: channelForm.channelSettings.title,
          Hnojeni_Cas: 0,
          Identifikator: WebSocketRequestTypes.FetchChannelSettings,
          Kanal_Cislo: Number(key),
          Kanal_Rezim: KanalRezim.Light,
          Hnojeni_Rezim: 0,
          Hnojeni_Mnozstvi: 0,
          Hnojeni_KalibracniKoeficient: 0,
          Hnojeni_DenPoslednihoHnojeni: 0,
          Hnojeni_DnyHnojeni: [true, false, false, true, false, false],
          Osvetleni_Body: [],
        };
      }
    );

    return channelsWebSocket;
  };

  return { formatDataToWebApp, formatDateFromAppToWebSocket };
};

export const useFormatWebSocketDeviceSettingsDataToWebApp = () => {
  const formatWebSocketDeviceSettingsToWebApp = (
    deviceSettings: ZarizeniNastaveni
  ): WifiForm => {
    const {
      CasFloat_h,
      Zarizeni_Jmeno,
      aktualniHodina,
      aktualniMinuta,
      aktualniSekunda,
      Wifi_ClientMode_IP,
      Wifi_ClientMode_DostupneWifi,
      Wifi_ClientMode_Pripojeno,
      Zarizeni_MAC,
      Zarizeni_NazevFW_Aktualni,
      Zarizeni_NazevFW_Budouci,
      Wifi_ClientMode_SilaSignalu,
      CasRezim,
      Den,
      Mesic,
      Rok,
      Wifi_ClientMode_SSID,
      Wifi_Rezim,
      Zarizeni_ID,
    } = deviceSettings;

    const accessibleWifiList: AccessibleWifiType[] =
      Wifi_ClientMode_DostupneWifi.map((wifi) => {
        return { id: wifi, name: wifi };
      });

    const timeFloatDevice = floatToTimeString(CasFloat_h);
    const [hour, minutes] = timeFloatDevice.split(":");
    const controllerDate = dayjs(
      `${Rok}-${String(Mesic).padStart(2, "0")}-${String(Den).padStart(
        2,
        "0"
      )}T${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
    );

    const formDate = dayjs(
      `${Rok}-${String(Mesic).padStart(2, "0")}-${String(Den).padStart(
        2,
        "0"
      )}T${String(aktualniHodina).padStart(2, "0")}:${String(
        aktualniMinuta
      ).padStart(2, "0")}:${String(aktualniSekunda).padStart(2, "0")}`
    );

    return {
      accessibleWifiList: accessibleWifiList,
      wifiSignalStrength: Wifi_ClientMode_SilaSignalu,
      controllerDate: controllerDate.format(" DD.MM.YYYY HH:MM"),
      controllerName: Zarizeni_Jmeno,
      formDate: formDate.toISOString(),
      ipAddress: `${Wifi_ClientMode_IP}`,
      isAutomaticConnectionChecked: true,
      isAutomaticTimeChecked: CasRezim === "Manual" ? false : true,
      operatingMode: Wifi_Rezim,
      password: "heslohesloano",
      wifiName: Wifi_ClientMode_SSID,
      FWCurrent: Zarizeni_NazevFW_Aktualni,
      FWFuture: Zarizeni_NazevFW_Budouci,
      MACAddress: Zarizeni_MAC,
      isClientModeConnected: Wifi_ClientMode_Pripojeno,
      deviceId: Zarizeni_ID,
    };
  };

  return formatWebSocketDeviceSettingsToWebApp;
};

export const getWifiIcon = (strength: number) => {
  const gap = { paddingX: "1rem" };

  if (strength >= 75) return <SignalWifi4Bar sx={gap} color="secondary" />;
  if (strength >= 50) return <SignalWifi3Bar sx={gap} color="secondary" />;
  if (strength >= 30) return <SignalWifi2Bar sx={gap} color="secondary" />;
  if (strength >= 10) return <SignalWifi1Bar sx={gap} color="secondary" />;
  return <SignalWifi0Bar sx={gap} color="secondary" />;
};

const getConvertedLightChannel = (
  channelSettings: KanalRezimNastaveni,
  id: number,
  slidersData: Record<number, SliderData>,
  allIds: number[]
): ChannelForm & LightFormType => {
  return {
    id: id,
    channelActionType: ChannelActionType.Light,
    channelSettings: {
      title: channelSettings.Kanal_Nazev,
      expanded: false,
      color: "secondary",
    },
    slidersData,
    allIds: allIds,
    lastIncrementedId: allIds.at(-1) ?? 0,
  };
};
const getConvertedFertilizeChannel = (
  channelSettings: KanalRezimNastaveni,
  id: number
): ChannelForm & FertilizeFormType => {
  const fertilizeWeek = channelSettings.Hnojeni_DnyHnojeni;

  return {
    id: id,
    channelActionType: ChannelActionType.Fertilize,
    channelSettings: {
      title: channelSettings.Kanal_Nazev,
      expanded: false,
      color: "secondary",
    },
    calibrationCoeficient: 2,
    fertilizeCalendar: {
      monday: fertilizeWeek[1],
      tuesday: fertilizeWeek[2],
      wednesday: fertilizeWeek[3],
      thursday: fertilizeWeek[4],
      friday: fertilizeWeek[5],
      saturday: fertilizeWeek[6],
      sunday: fertilizeWeek[7],
    },
    fertilizerAmount: 2,
    time: floatToTimeString(channelSettings.Hnojeni_Cas),
  };
};
const getConvertedNotSelectedChannel = (
  channelSettings: KanalRezimNastaveni,
  id: number
): ChannelForm & NotSelectedActionTypeForm => {
  return {
    id: id,
    channelActionType: ChannelActionType.NotSelected,
    channelSettings: {
      title: channelSettings.Kanal_Nazev,
      expanded: false,
      color: "secondary",
    },
  };
};
