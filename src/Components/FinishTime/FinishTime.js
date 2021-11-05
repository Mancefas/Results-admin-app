import React, { useState, useRef } from "react";
import { TextField, Container, Button, Box } from "@mui/material";

const FinishTime = () => {
  const inputRef = useRef();
  const [valueFromInput, setValueFromInput] = useState();

  const raceStart = new Date("2021-10-17T11:00:00");

  const inputHandler = () => {
    setValueFromInput(inputRef.current.value);
    inputRef.current.value = "";
    const raceNumber = valueFromInput;
    const currentTime = new Date();

    const finishedRacer = {
      dalyvis: raceNumber,
      startoLaikas: `${raceStart
        .getHours()
        .toString()
        .padStart(2, 0)}:${raceStart
        .getMinutes()
        .toString()
        .padStart(2, 0)}:${raceStart.getSeconds().toString().padStart(2, 0)}`,
      finisoLaikas: `${currentTime
        .getHours()
        .toString()
        .padStart(2, 0)}:${currentTime
        .getMinutes()
        .toString()
        .padStart(2, 0)}:${currentTime.getSeconds().toString().padStart(2, 0)}`,
      vaziavimoLaikas: `${currentTime.getHours() - raceStart.getHours()}:${(
        currentTime.getMinutes() - raceStart.getMinutes()
      )
        .toString()
        .padStart(2, 0)}:${(currentTime.getSeconds() - raceStart.getSeconds())
        .toString()
        .padStart(2, 0)}`,
    };

    async function sendFinishTimeAndRaceNr(rider) {
      const response = await fetch(
        "https://gif-rezultatai-b73a6-default-rtdb.europe-west1.firebasedatabase.app/rez.json",
        {
          method: "POST",
          body: JSON.stringify(rider),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    }

    sendFinishTimeAndRaceNr(finishedRacer);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ textAlign: "center", justifyContent: "space-around" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <TextField
          sx={{ width: "50%" }}
          label="Dalyvio nr."
          color="primary"
          focused
          size="medium"
          type={"text"}
          inputRef={inputRef}
        />
        <Button
          sx={{ width: "75%" }}
          variant="contained"
          onClick={inputHandler}
        >
          Finišavo
        </Button>
      </Box>
    </Container>
  );
};

export default FinishTime;
