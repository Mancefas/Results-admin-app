import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Container,
  Button,
  Box,
  Avatar,
  Alert,
} from "@mui/material";

import config from "../../config.json";

let initialLoad = true;

const FinishTime = () => {
  const inputRef = useRef();
  const [racer, setRacer] = useState();
  const [sentOK, setSentOK] = useState();
  const [notSent, setNotSent] = useState();
  const [countFinished, setCountFinished] = useState(0);
  const [apiError, setApiError] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSentOK(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [sentOK]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotSent(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [notSent]);

  const raceStart = new Date("2021-10-17T11:00:00");

  const inputHandler = () => {
    setCountFinished((count) => count + 1);
    const raceNumber = inputRef.current.value;
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

    setRacer(finishedRacer);
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (initialLoad) {
      initialLoad = false;
      return;
    }
    try {
      if (racer === undefined) {
        return;
      }
      async function sendFinishTimeAndRaceNr(racer) {
        const response = await fetch(config.API_URL_RACERS, {
          method: "POST",
          body: JSON.stringify(racer),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSentOK(response.ok);
        if (!response.ok) {
          setNotSent(true);
          setApiError("Klaida siunčiant! ");
        }
      }
      sendFinishTimeAndRaceNr(racer);
    } catch (error) {
      setApiError(error);
    }
  }, [racer]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        textAlign: "center",
      }}
    >
      {apiError && (
        <Alert
          variant="filled"
          severity="error"
          onClose={() => {
            setApiError(false);
          }}
        >
          {apiError}
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Avatar sx={{ color: "#FFFFFF", bgcolor: "#0288d1" }} variant="square">
          {countFinished}
        </Avatar>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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

          {notSent && <Alert severity="error"></Alert>}
          {sentOK && <Alert severity="success"></Alert>}
        </Box>
        <Button
          sx={{
            width: "75%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
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
