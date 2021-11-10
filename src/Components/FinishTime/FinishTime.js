import React, { useState, useRef, useEffect } from "react";
import { TextField, Container, Button, Box, Avatar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const FinishTime = () => {
  const inputRef = useRef();
  const [valueFromInput, setValueFromInput] = useState();
  const [sentOK, setSentOK] = useState();
  const [countFinished, setCountFinished] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSentOK(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [sentOK]);

  const raceStart = new Date("2021-10-17T11:00:00");

  const inputHandler = () => {
    setValueFromInput(inputRef.current.value);
    inputRef.current.value = "";
    setCountFinished((count) => count + 1);
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
      setSentOK(response.ok);
    }

    sendFinishTimeAndRaceNr(finishedRacer);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        textAlign: "center",
      }}
    >
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

          {sentOK && <CheckIcon color={"success"} />}
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
