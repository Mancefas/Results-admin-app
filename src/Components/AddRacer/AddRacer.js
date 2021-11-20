import { Container, TextField, Box, Button, Alert } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

import config from "../../config.json";

const AddRacer = () => {
  const inputRef = useRef();
  const [racer, setRacer] = useState(undefined);
  const [sentToDB, setSentToDB] = useState(false);
  const [failedToSendToDB, setFailedToSendToDB] = useState(false);

  const formSubmitHanlder = (e) => {
    e.preventDefault();

    const dviratis = e.target.dviratis.value;
    const grupe = e.target.grupe.value;

    setRacer({
      dist: +e.target.distancija.value,
      dviratis: dviratis.toUpperCase(),
      grupe: grupe.toUpperCase(),
      startoNr: +e.target.startoNr.value,
      vardas: [e.target.vardas.value, e.target.pavarde.value],
    });

    e.target[0].value = "";
    e.target[2].value = "";
    e.target[4].value = "";
    e.target[6].value = "";
    e.target[8].value = "";
    e.target[10].value = "";
  };
  useEffect(() => {
    try {
      async function sendNewRacer(racer) {
        if (!racer) {
          return;
        }
        const response = await fetch(config.API_URL_RACERS, {
          method: "POST",
          body: JSON.stringify(racer),
          headers: {
            "Content-Type": "application/json",
          },
        });

        //Should handle error message ...!!!
        if (!response.ok) {
          setSentToDB(false);
          setFailedToSendToDB("Nepavyko užregistruoti dalyvio!");
          setTimeout(() => {
            setFailedToSendToDB(false);
          }, 3000);
        }
      }

      if (!racer) {
        return;
      }
      sendNewRacer(racer);
    } catch (error) {
      setFailedToSendToDB(error);
    }

    setSentToDB(true);
    setTimeout(() => {
      setSentToDB(false);
    }, 3000);
  }, [racer]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        textAlign: "center",
        height: "fit-content",
      }}
    >
      {failedToSendToDB && <Alert severity="error">{failedToSendToDB}</Alert>}
      {sentToDB && <Alert severity="success">Dalyvis užregistruotas!</Alert>}
      <Box sx={{ height: "fit-content" }}>
        <form onSubmit={formSubmitHanlder}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "1rem",
            }}
          >
            <TextField
              label="Vardas"
              name="vardas"
              inputRef={inputRef}
            ></TextField>
            <TextField
              label="Pavardė"
              name="pavarde"
              inputRef={inputRef}
            ></TextField>
          </Box>
          <TextField label="Distancija" name="distancija"></TextField>
          <TextField label="Dviratis" name="dviratis"></TextField>
          <TextField label="Grupė" name="grupe"></TextField>
          <TextField label="Starto nr." name="startoNr"></TextField>
          <Box>
            <Button type="submit" variant="contained" sx={{ margin: "0.5rem" }}>
              Suvesti
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddRacer;
