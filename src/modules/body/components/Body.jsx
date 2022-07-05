import React from "react";
import * as PropTypes from "prop-types";
import { Box, Button, Paper, Tab, Tabs, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import BODY_TYPES from "../util/bodyTypes";
import LoadingBackdrop from "./LoadingBackdrop";
import InformationPanel from "../../informationPanel/components/InformationPanel";
import actions from "../../../store/actions";
import ContinueModal from "../../stepper/components/ContinueModal";

const Body = () => {
  const theme = useTheme();
  const bodyType = useSelector(selectors.getBodyType);
  const activeStep = useSelector(selectors.getActiveStep);
  const modal = useSelector(selectors.getModal);

  const dispatch = useDispatch();

  const handleTabSelected = (event, value) => {
    dispatch(actions.acSetBodyType(value));
  };

  const handleContinueClicked = () => {
    dispatch(actions.continueStep());
  };
  const handleBackClicked = () => {
    dispatch(actions.backStep());
  };

  const renderTabs = () => (
    <Tabs value={bodyType} onChange={handleTabSelected}>
      {Object.values(activeStep.components).map((key) => (
        <Tab value={key} key={key} label={BODY_TYPES[key].title} />
      ))}
    </Tabs>
  );

  const renderBodyComponent = () => {
    if (!BODY_TYPES[bodyType]) return null;
    const Component = BODY_TYPES[bodyType].component;
    return (
      <Component
        continueComponent={
          <Button variant="contained" onClick={handleContinueClicked}>
            Continue
          </Button>
        }
        backComponent={
          <Button variant="contained" onClick={handleBackClicked}>
            Back
          </Button>
        }
      />
    );
  };

  const renderModal = () => (
    <>
      <ContinueModal open={modal && modal.type === "continue"} />
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: `calc(100% - ${theme.spacing(4)})`,
        height: `calc(100% - 96px - ${theme.spacing(4)})`,
        maxHeight: `calc(100% - 96px - ${theme.spacing(4)})`,
        gap: theme.spacing(2),
        justifyContent: "flex-start",
        alignItems: "center",
        margin: theme.spacing(2),
      }}
    >
      {activeStep && renderTabs()}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          // width: `calc(100% - ${theme.spacing(2)})`,
          // height: "-webkit-fill-available",
          // maxHeight: "-webkit-fill-available",
          maxHeight: `calc(100% - ${theme.spacing(8)})`,
          flexShrink: 1,
          // height: `calc(100% - ${theme.spacing(4)})`,
          gap: theme.spacing(2),
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        {renderBodyComponent()}
      </Box>
      <LoadingBackdrop />
      {modal && renderModal()}
    </Box>
  );
};

Body.propTypes = {};
Body.defaultProps = {};

export default React.memo(Body);
