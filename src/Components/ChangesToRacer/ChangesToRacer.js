import React, { useState } from "react";

import { useSelector } from "react-redux";

import { Container, TextField, Box, Button } from "@mui/material";

const ChangesToRacer = () => {
  const [newTime, setNewTime] = useState();

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

    e.target.racerNumber.value = "";
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
          <TextField label="Dalyvio numeris" name="racerNumber"></TextField>
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
        <Button p={1} type="submit" variant="contained">
          Keisti
        </Button>
      </form>
    </Container>
  );
};

export default ChangesToRacer;
