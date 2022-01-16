import React, { useState, useEffect, useContext } from "react";

import { Container, TextField, Box, Button } from "@mui/material";

import config from "../../config.json";
import AuthContext from "../../store/auth-context";

import SelectButton from "./SelectButton";

const ChangesToRacer = () => {
  const context = useContext(AuthContext);
  const [racerNR, setRacerNr] = useState();
  const [newTime, setNewTime] = useState();
  const [dataOfAllResults, setDataOfAllResults] = useState();

  const racerNrHandler = (number) => {
    setRacerNr(number);
  };

  // Get data of all racers
  const fetchindData = async () => {
    try {
      const response = await fetch(config.API_URL_RESULT);
      const data = await response.json();
      const dataToArrayOfObjects = [];
      for (const key in data) {
        dataToArrayOfObjects.push({
          id: key,
          startoLaikas: data[key].startoLaikas,
          finisoLaikas: data[key].finisoLaikas,
          vaziavimoLaikas: data[key].vaziavimoLaikas,
          dalyvis: data[key].dalyvis,
        });
      }
      setDataOfAllResults(dataToArrayOfObjects);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchindData();
  }, []);

  // change finishing time on firebase database
  const replaceRaceTime = async () => {
    const changedTime = newTime.finisoLaikas;
    const racerForChanges = dataOfAllResults.filter(
      (number) => number.dalyvis === racerNR
    );
    const firebaseIdOfRacer = racerForChanges[0].id;

    try {
      await fetch(
        `${config.API_URL_FOR_CHANGES}${firebaseIdOfRacer}.json?auth=${context.token}`,
        {
          method: "PATCH",
          body: JSON.stringify({ finisoLaikas: `${changedTime}` }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!newTime) {
      return;
    }
    replaceRaceTime();
    // eslint-disable-next-line
  }, [newTime]);

  // Get new finishing time from textfield
  const submitedHandler = (e) => {
    e.preventDefault();

    const newRaceTime = {
      dalyvis: racerNR,
      finisoLaikas: e.target.newTimeInput.value,
    };
    setNewTime(newRaceTime);

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
          <SelectButton
            raceData={dataOfAllResults}
            racerNrHandler={racerNrHandler}
            racerNR={racerNR}
            name="racerNumber"
          />
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
        <Button
          disabled={racerNR === undefined ? true : false}
          p={1}
          type="submit"
          variant="contained"
        >
          Keisti
        </Button>
      </form>
    </Container>
  );
};

export default ChangesToRacer;
