import { Container, TextField, Box, Button, Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import config from "../../config.json";

import useInputValidation from "../../hooks/use-input-valid";
const inputNotEmpty = (value) => value.trim() !== "";
let validForm = false;

const AddRacer = () => {
  const [racer, setRacer] = useState(undefined);
  const [sentToDB, setSentToDB] = useState(false);
  const [failedToSendToDB, setFailedToSendToDB] = useState(false);

  // Validating name input
  const {
    value: nameValue,
    valid: nameValid,
    notValid: nameError,
    userInputHandler: nameInputHandler,
    userInputTouchedHandler: nameInputTouched,
    reset: setUserInput,
  } = useInputValidation(inputNotEmpty);

  // Validating surname input
  const {
    value: surnameValue,
    valid: surnameValid,
    notValid: surnameError,
    userInputHandler: surnameInputHandler,
    userInputTouchedHandler: surnameInputTouched,
    reset: setSurnameInput,
  } = useInputValidation(inputNotEmpty);

  if (nameValid && surnameValid) {
    validForm = true;
  }
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

    setUserInput();
    setSurnameInput();
    e.target.distancija.value = "";
    e.target.dviratis.value = "";
    e.target.grupe.value = "";
    e.target.startoNr.value = "";
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
        if (response.ok) {
          setSentToDB(true);
          setTimeout(() => {
            setSentToDB(false);
          }, 3000);
        } else {
          setFailedToSendToDB("Nepavyko užregistruoti dalyvio!");
        }
      }
      sendNewRacer(racer);
    } catch (error) {
      setFailedToSendToDB(error);
    }
  }, [racer]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        textAlign: "center",
        height: "fit-content",
      }}
    >
      {failedToSendToDB && (
        <Alert
          severity="error"
          onClose={() => {
            setFailedToSendToDB(false);
          }}
        >
          {failedToSendToDB}
        </Alert>
      )}
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
              value={nameValue}
              error={nameError}
              onChange={nameInputHandler}
              onBlur={nameInputTouched}
              helperText={nameError ? "Dalyvio vardas būtinas" : ""}
            ></TextField>
            <TextField
              label="Pavardė"
              name="pavarde"
              value={surnameValue}
              error={surnameError}
              onChange={surnameInputHandler}
              onBlur={surnameInputTouched}
              helperText={surnameError ? "Dalyvio pavardė būtina" : ""}
            ></TextField>
          </Box>
          <TextField label="Distancija" name="distancija"></TextField>
          <TextField label="Dviratis" name="dviratis"></TextField>
          <TextField label="Grupė" name="grupe"></TextField>
          <TextField label="Starto nr." name="startoNr"></TextField>
          <Box>
            <Button
              disabled={!validForm}
              type="submit"
              variant="contained"
              sx={{ margin: "0.5rem" }}
            >
              Suvesti
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddRacer;
