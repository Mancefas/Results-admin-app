import React, { useState } from "react";

import { useSelector } from "react-redux";

import { Container, TextField, Box, Button } from "@mui/material";

import useInputValidation from "../../hooks/use-input-valid";
const inputNotEmpty = (value) => value.trim() !== "";
let validForm = false;

const ChangesToRacer = () => {
  const [newTime, setNewTime] = useState();

  //Validate input
  const {
    value: raceNumberValue,
    valid: validNR,
    notValid: notValidNR,
    userInputHandler: raceNRInputHandler,
    userInputTouchedHandler: raceNrInputTouchedHandler,
    reset: raceNumberInputField,
  } = useInputValidation(inputNotEmpty);

  if (validNR) {
    validForm = true;
  }

  //Console.log data before API post
  console.log(newTime);

  const startTime = useSelector((state) => state.sharedData.raceStart);

  const submitedHandler = (e) => {
    e.preventDefault();

    const newFinishTime = new Date(`2021/11/11/${e.target.newTimeInput.value}`);

    const newRaceTime = {
      dalyvis: e.target.racerNumber.value,
      startoLaikas: `${startTime
        .getHours()
        .toString()
        .padStart(2, 0)}:${startTime
        .getMinutes()
        .toString()
        .padStart(2, 0)}:${startTime.getSeconds().toString().padStart(2, 0)}`,
      finisoLaikas: e.target.newTimeInput.value,
      vaziavimoLaikas: `${newFinishTime.getHours() - startTime.getHours()}:${(
        newFinishTime.getMinutes() - startTime.getMinutes()
      )
        .toString()
        .padStart(2, 0)}:${(newFinishTime.getSeconds() - startTime.getSeconds())
        .toString()
        .padStart(2, 0)}`,
    };
    setNewTime(newRaceTime);

    raceNumberInputField();
    e.target.newTimeInput.value = "";
  };

  const inputProps = {
    step: 1,
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        textAlign: "center",
        height: "fit-content",
      }}
    >
      <form onSubmit={submitedHandler}>
        <Box p={1}>
          <TextField
            type="number"
            label="Dalyvio numeris"
            name="racerNumber"
            error={notValidNR}
            value={raceNumberValue}
            onChange={raceNRInputHandler}
            onBlur={raceNrInputTouchedHandler}
            helperText={notValidNR ? "Reikalingas dalyvio nr." : ""}
          ></TextField>
        </Box>
        <Box p={1}>
          <TextField
            label="Naujas finišo laikas"
            type="time"
            inputProps={inputProps}
            name="newTimeInput"
            sx={{ width: "70%" }}
          ></TextField>
        </Box>
        <Button disabled={!validForm} p={1} type="submit" variant="contained">
          Keisti
        </Button>
      </form>
    </Container>
  );
};

export default ChangesToRacer;
