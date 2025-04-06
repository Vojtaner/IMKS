import { useEffect } from "react";
import { selectFromAppState, useAppDispatch } from "../../store/storeRedux";

import {
  useFormatWebSocketChannelsData,
  useFormatWebSocketDeviceSettingsDataToWebApp,
} from "./formatWebSocketData";
import { setWifiDeviceSettings } from "../../store/slices/settingsSlice";
import { setCompleteObject } from "../../store/slices/channelsSlice";
import { selectChannels } from "../../store/selectors/channelSelectors";
import { useSharedWebSocket } from "../../contextAPI/webSocketContext";

export type WebsocketLastJsonMessageType = DeviceSettings | ChannelSettings;

type DeviceSettings = ZarizeniNastaveni;

export type ZarizeniNastaveni = {
  Identifikator: WebSocketRequestTypes.FetchDeviceSettings;
  Datum_UNIX: number;
  CasRezim: "Auto" | "Manual";
  CasFloat_h: number;
  aktualniHodina: number;
  aktualniMinuta: number;
  aktualniSekunda: number;
  Den: number;
  Mesic: number;
  Rok: number;
  Wifi_ClientMode_DostupneWifi: string[];
  Wifi_ClientMode_IP: string;
  Wifi_ClientMode_Pripojeno: boolean;
  Wifi_ClientMode_SSID: string;
  Wifi_ClientMode_SilaSignalu: number;
  Wifi_Rezim: "ClientMode" | "APMode";
  Wifi_SoftAP_Mode_SSID: string;
  Zarizeni_ID: string;
  Zarizeni_Jmeno: string;
  Zarizeni_MAC: string;
  Zarizeni_NazevFW_Aktualni: string;
  Zarizeni_NazevFW_Budouci: string;
};

export enum KanalRezim {
  Light = "RezimKanal_LED",
  Fertilize = "RezimKanal_Hnojeni",
  NotSelected = "RezimKanal_Off",
}

function isDeviceSettings(
  jsonMessage: WebsocketLastJsonMessageType
): jsonMessage is DeviceSettings {
  return (
    jsonMessage.Identifikator === WebSocketRequestTypes.FetchDeviceSettings
  );
}
function isChannelSettings(
  jsonMessage: WebsocketLastJsonMessageType
): jsonMessage is ChannelSettings {
  return (
    jsonMessage.Identifikator === WebSocketRequestTypes.FetchChannelSettings
  );
}

export type ChannelSettings = {
  Identifikator: WebSocketRequestTypes.FetchChannelSettings;
  KanalRezimNastaveni: KanalRezimNastaveni[];
};

export type KanalRezimNastaveni = {
  Kanal_Nazev: string;
  Kanal_Cislo: number;
  Identifikator: WebSocketRequestTypes.FetchChannelSettings;
  Kanal_Rezim: KanalRezim;
  Hnojeni_Rezim: number;
  Hnojeni_Cas: number;
  Hnojeni_Mnozstvi: number;
  Hnojeni_KalibracniKoeficient: number;
  Hnojeni_DenPoslednihoHnojeni: number;
  Hnojeni_DnyHnojeni: boolean[];
  Osvetleni_Body: OsvetleniBod[];
};

export enum WebSocketRequestTypes {
  FetchChannelSettings = "fetch_KanalRezimNastaveni",
  FetchDeviceSettings = "fetch_ZarizeniNastaveni",
  UpdateChannelSettings = "updateKanalRezimNastaveni",
  UpdateDeviceSettings = "update_ZarizeniNastaveni",
  ManualFertilization = "instruction_Manualni_Prikazy",
}

export type WebSocketRequests =
  | ManualFertilizationPrompt
  | KanalRezimNastaveni
  | ZarizeniNastaveni
  | {
      type: WebSocketRequestTypes.UpdateChannelSettings;
      KanalRezimNastaveni: KanalRezimNastaveni[];
    };

export type ManualFertilizationPrompt = {
  Kanal_Cislo: string;
  Prikaz: "Manulni_Hnojeni";
  type: WebSocketRequestTypes.ManualFertilization;
};

export type OsvetleniBod = {
  Cas: number;
  Intenzita: number;
};

const WebSocketComponent = () => {
  const dispatch = useAppDispatch();
  const { formatDataToWebApp, formatDateFromAppToWebSocket } =
    useFormatWebSocketChannelsData();
  const formatWebSocketDeviceSettingsDataToWebApp =
    useFormatWebSocketDeviceSettingsDataToWebApp();

  const { lastJsonMessage, sendJsonMessage } = useSharedWebSocket();

  useEffect(() => {
    if (lastJsonMessage) {
      console.log({ lastJsonMessage });

      if (isDeviceSettings(lastJsonMessage)) {
        const wifiSettingsData =
          formatWebSocketDeviceSettingsDataToWebApp(lastJsonMessage);
        dispatch(setWifiDeviceSettings(wifiSettingsData));
      }

      if (isChannelSettings(lastJsonMessage)) {
        const channelSettingsData = formatDataToWebApp(
          lastJsonMessage.KanalRezimNastaveni
        );
        dispatch(setCompleteObject(channelSettingsData));
        selectFromAppState(selectChannels);
      }
    }
  }, [lastJsonMessage]);

  const sendMessageSetting = () => {
    const channelWebAppData = selectFromAppState(selectChannels);
    const formattedChannelWebAppDataToWebSocket =
      formatDateFromAppToWebSocket(channelWebAppData);
    console.log({ formattedChannelWebAppDataToWebSocket });

    sendJsonMessage({
      type: "updateKanalRezimNastaveni",
      KanalRezimNastaveni: formattedChannelWebAppDataToWebSocket,
    });
  };

  return (
    <div>
      <button onClick={sendMessageSetting}>odeslat</button>
      <button
        onClick={() => sendJsonMessage({ type: "fetch_KanalRezimNastaveni" })}
      >
        fetch_KanalRezimNastaveni
      </button>
      <button
        onClick={() => sendJsonMessage({ type: "fetch_ZarizeniNastaveni" })}
      >
        fetch_ZarizeniNastaveni
      </button>
      <button
        onClick={() => {
          console.log(lastJsonMessage);
          console.log(lastJsonMessage);
        }}
      >
        prijato
      </button>
    </div>
  );
};

export default WebSocketComponent;
