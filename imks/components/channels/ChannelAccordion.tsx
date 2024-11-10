import { imksTheme } from "../../theme/customeTheme";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { EditableChip } from "./channelHeader/EditableChip";
import ButtonBar from "./channelButtonMenu/ButtonBar";
import { AccordionHeaderInput } from "./channelHeader/AccordionHeaderInput";
import { ExpandMoreButton } from "./channelHeader/ExpandMoreButton";
import { LightSettingsList } from "./channelBody/light/LightSettingsList";
import { FertilizeSettingForm } from "./channelBody/fertilize/FertilizeSettingForm";
import { ChannelActionTypeChoice } from "./channelBody/notSelected/ChannelActionTypeChoice";
import { getAppState, useAppSelector } from "../../store/storeRedux";
import {
  selectChannelActionType,
  selectChannelExpanded,
  selectChannelTitle,
} from "../../store/selectors/channelSelectors";
import { ChannelActionType } from "../../entity/entity";
import { useDispatch } from "react-redux";
import {
  addSlider,
  resetChannelActionType,
} from "../../store/slices/channelsSlice";

export function ChannelAccordion(props: { channelId: number }) {
  const { channelId } = props;
  const dispatch = useDispatch();
  const channelActionType = useAppSelector((state) =>
    selectChannelActionType(state, props.channelId)
  );
  const isExpanded = useAppSelector((state) =>
    selectChannelExpanded(state, props.channelId)
  );
  const channelTitle = useAppSelector((state) =>
    selectChannelTitle(state, props.channelId)
  );

  console.log({ state: getAppState() });

  return (
    <Accordion
      expanded={isExpanded}
      key={props.channelId}
      sx={{
        margin: "0px 0.2rem 1rem 0.2rem",
        borderRadius: "4px",
        "& .MuiAccordionSummary-content.Mui-expanded": {
          margin: "0px",
        },
        "& .MuiAccordionSummary-content": {
          margin: "0px",
        },
        "::before": {
          content: "none",
        },
      }}
    >
      <AccordionSummary
        aria-controls={`${props.channelId} ${channelTitle}`}
        id={`${props.channelId}`}
        sx={{
          position: "relative",
          padding: "0.5rem 0rem",
          marginTop: "2rem",
          "& .MuiAccordionSummary-content": {
            justifyContent: "space-between",
          },
          "& .MuiAccordionSummary-content .MuiInputBase-input": {
            height: "0px",

            fontSize: "1rem",
            color: imksTheme.palette.secondary.main,
            textTransform: "uppercase",
            fontWeight: "500",
            "&::placeholder": {
              opacity: 1,
            },
          },
          "& .MuiAccordionSummary-content .MuiInputBase-input.Mui-disabled": {
            "&::placeholder": {
              WebkitTextFillColor: imksTheme.palette.secondary.main,
            },
          },
          "&.Mui-focusVisible": {
            backgroundColor: "white",
          },
        }}
      >
        <EditableChip channelId={props.channelId} />
        <AccordionHeaderInput channelId={props.channelId} />
        <ExpandMoreButton channelId={props.channelId} />
      </AccordionSummary>
      <AccordionDetails>
        <ChannelAccordion.ButtoBar
          channelId={props.channelId}
          channelActionType={channelActionType}
          onClearForm={() => alert("nepřipraveno")}
          onResetChannel={() =>
            dispatch(resetChannelActionType(props.channelId))
          }
          onAddNewSlider={() => dispatch(addSlider({ channelId }))}
        />
        {channelActionType === ChannelActionType.Light && (
          <LightSettingsList
            isExpanded={isExpanded}
            channelId={props.channelId}
          />
        )}
        {channelActionType === ChannelActionType.Fertilize && (
          <FertilizeSettingForm />
        )}
        {channelActionType === ChannelActionType.NotSelected && (
          <ChannelActionTypeChoice channelId={props.channelId} />
        )}
      </AccordionDetails>
    </Accordion>
  );
}

ChannelAccordion.ButtoBar = ButtonBar;
