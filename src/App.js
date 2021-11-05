import React, { useState } from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import ConstructionIcon from "@mui/icons-material/Construction";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FinishTime from "./Components/FinishTime/FinishTime";

function App() {
  const [value, setValue] = React.useState(0);

  const [showFinishTimeComponent, setShowFinishTimeComponent] = useState(false);
  const showFinRacerHandler = () => {
    setShowFinishTimeComponent(!showFinishTimeComponent);
  };

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
        {showFinishTimeComponent && <FinishTime />}
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
        />
        <BottomNavigationAction
          label="Taisyti dalyvio laiką "
          icon={<ConstructionIcon />}
        />
      </BottomNavigation>
    </section>
  );
}

export default App;
