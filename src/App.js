import React from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";

import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";

import ContactsIcon from "@mui/icons-material/Contacts";
import ConstructionIcon from "@mui/icons-material/Construction";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

import FinishTime from "./Components/FinishTime/FinishTime";
import AddRacer from "./Components/AddRacer/AddRacer";
import ChangesToRacer from "./Components/ChangesToRacer/ChangesToRacer";

function App() {
  const dispatch = useDispatch();

  const showFinishTime = useSelector(
    (state) => state.ui.showFinishTimeComponent
  );
  const showFinRacerHandler = () => {
    dispatch(uiActions.showFinish());
  };

  const showAddRacer = useSelector((state) => state.ui.showAddRacerComponent);
  const showAddRacerHandler = () => {
    dispatch(uiActions.showAddRacer());
  };

  const showChangesToRacer = useSelector(
    (state) => state.ui.showChangesToRacerComponent
  );
  const showChangesToRacerHandler = () => {
    dispatch(uiActions.showChangesToRacer());
  };

  const [value, setValue] = React.useState(0);

  return (
    <section>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "80vh",
          padding: "1rem",
        }}
      >
        {showFinishTime && <FinishTime />}
        {showAddRacer && <AddRacer />}
        {showChangesToRacer && <ChangesToRacer />}
      </Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Fiksuoti laiką"
          icon={<DirectionsBikeIcon />}
          onClick={showFinRacerHandler}
        />
        <BottomNavigationAction
          label="Suvesti
           dalyvį"
          icon={<ContactsIcon />}
          onClick={showAddRacerHandler}
        />
        <BottomNavigationAction
          label="Taisyti dalyvio laiką "
          icon={<ConstructionIcon />}
          onClick={showChangesToRacerHandler}
        />
      </BottomNavigation>
    </section>
  );
}

export default App;
