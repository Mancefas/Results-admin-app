import {
  Container,
  TextField,
  Box,
  Button,
  Alert,
  Autocomplete,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import config from "../../config.json";

import useInputValidation from "../../hooks/use-input-valid";
const inputNotEmpty = (value) => value.trim() !== "";
let validForm = false;

const AddRacer = () => {
  const [racer, setRacer] = useState(undefined);
  const [sentToDB, setSentToDB] = useState(false);
  const [failedToSendToDB, setFailedToSendToDB] = useState(false);
  const [raceDistanceInputValue, setRaceDistanceInputValue] = useState();
  const [bicycleInputValue, setBicycleInputValue] = useState();
  const [raceGroupInputValue, setRaceGroupInputValue] = useState();

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

  //Validate race number input
  const {
    value: raceNRValue,
    valid: raceNRValid,
    notValid: raceNRError,
    userInputHandler: raceNRInputHandler,
    userInputTouchedHandler: raceNRInputTouched,
    reset: setRaceNRInput,
  } = useInputValidation(inputNotEmpty);

  if (nameValid && surnameValid && raceNRValid) {
    validForm = true;
  }
  const formSubmitHanlder = (e) => {
    e.preventDefault();

    // const dviratis = e.target.dviratis.value;

    setRacer({
      dist: +raceDistanceInputValue,
      dviratis: bicycleInputValue,
      grupe: raceGroupInputValue,
      startoNr: +e.target.startoNr.value,
      vardas: [e.target.vardas.value, e.target.pavarde.value],
    });

    setUserInput();
    setSurnameInput();
    setRaceNRInput();
    validForm = false;

    // e.target.dviratis.value = "";
    // e.target.grupe.value = "";
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
            <TextField
              type="number"
              label="Starto nr."
              name="startoNr"
              value={raceNRValue}
              error={raceNRError}
              onChange={raceNRInputHandler}
              onBlur={raceNRInputTouched}
              helperText={raceNRError ? "Dalyvio numeris būtinas" : ""}
            ></TextField>
          </Box>
          <Autocomplete
            inputValue={raceDistanceInputValue}
            onInputChange={(event, newInputValue) => {
              setRaceDistanceInputValue(newInputValue);
            }}
            disablePortal
            id="race-groups"
            options={config.RACE_DISTANCE}
            sx={{}}
            renderInput={(params) => (
              <TextField {...params} label="Distancija" />
            )}
          />
          <Autocomplete
            inputValue={bicycleInputValue}
            onInputChange={(event, newInputValue) => {
              setBicycleInputValue(newInputValue);
            }}
            disablePortal
            id="bicycle"
            options={config.BICYCLE}
            sx={{}}
            renderInput={(params) => <TextField {...params} label="Dviratis" />}
          />
          <Autocomplete
            inputValue={raceGroupInputValue}
            onInputChange={(event, newInputValue) => {
              setRaceGroupInputValue(newInputValue);
            }}
            disablePortal
            id="race-group"
            options={config.GROUP}
            sx={{}}
            renderInput={(params) => <TextField {...params} label="Grupė" />}
          />
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
