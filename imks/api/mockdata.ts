import { AccordionLightType } from "../entity/entity";

export const panelList: AccordionLightType[] = [
  {
    id: "panel1",
    title: "Modrá barva",
    expanded: false,
    channelType: "light",
    lightSetting: [{ intensity: 40, time: new Date() }],
    color: "primary",
    channelIndex: "Kanál 1",
  },
  {
    id: "panel2",
    title: "zelená barva",
    expanded: false,
    channelType: "fertilize",
    lightSetting: [{ intensity: 90, time: new Date() }],
    color: "secondary",
    channelIndex: "Kanál 2",
  },
  {
    id: "panel3",
    title: "červená barva",
    expanded: false,
    channelType: "fertilize",
    lightSetting: [{ intensity: 90, time: new Date() }],
    color: "error",
    channelIndex: "Kanál 3",
  },
];
