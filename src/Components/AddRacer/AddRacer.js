import {
  Container,
  TextField,
  Box,
  Button,
  Alert,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import config from "../../config.json";

import AuthContext from "../../store/auth-context";

import useInputValidation from "../../hooks/use-input-valid";
const inputNotEmpty = (value) => value.trim() !== "";
let validForm = false;

const AddRacer = () => {
  const context = useContext(AuthContext);

  const [racer, setRacer] = useState(undefined);
  const [sentToDB, setSentToDB] = useState(false);
  const [failedToSendToDB, setFailedToSendToDB] = useState(false);
  const [raceDistanceInputValue, setRaceDistanceInputValue] = useState("");
  const [bicycleInputValue, setBicycleInputValue] = useState("");
  const [raceGroupInputValue, setRaceGroupInputValue] = useState("");

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

  if (
    nameValid &&
    surnameValid &&
    raceNRValid &&
    raceGroupInputValue &&
    (raceDistanceInputValue || bicycleInputValue)
  ) {
    validForm = true;
  }

  // select change handlers
  const groupChangeHandler = (event) => {
    setRaceGroupInputValue(event.target.value);
  };

  const bicycleChangeHandler = (event) => {
    setBicycleInputValue(event.target.value);
  };

  const distanceChangeHandler = (event) => {
    setRaceDistanceInputValue(event.target.value);
  };

  const formSubmitHanlder = (e) => {
    e.preventDefault();

    const racerObject = {
      grupe: raceGroupInputValue,
      startoNr: +e.target.startoNr.value,
      vardas: [e.target.vardas.value, e.target.pavarde.value],
    };

    //If there is added "RACE_DISTANCE" in config file then add dist object
    if (config.RACE_DISTANCE.length > 0) {
      racerObject["dist"] = +raceDistanceInputValue;
    }

    //If there is added "BICYCLE" in config file then add dviratis object
    if (config.BICYCLE.length > 0) {
      racerObject["dviratis"] = bicycleInputValue;
    }

    setRacer(racerObject);

    setUserInput();
    setSurnameInput();
    setRaceNRInput();
    validForm = false;
  };
  useEffect(() => {
    try {
      async function sendNewRacer(racer) {
        if (!racer) {
          return;
        }
        const response = await fetch(
          `${config.API_URL_RACERS}?auth=${context.token}`,
          {
            method: "POST",
            body: JSON.stringify(racer),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
  }, [racer, context.token]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        textAlign: "center",
        height: "fit-content",
        minHeight: "75vh",
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
          {config.RACE_DISTANCE.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <InputLabel id="race-distance">Distancija</InputLabel>
              <Select
                sx={{ width: "36%" }}
                labelId="Dviratis"
                id="bicycle"
                value={raceDistanceInputValue}
                onChange={distanceChangeHandler}
              >
                {config.RACE_DISTANCE.map((itm) => (
                  <MenuItem value={`${itm}`}>{itm}</MenuItem>
                ))}
              </Select>
            </Box>
          )}

          {config.BICYCLE.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <InputLabel id="race-bike">Dviratis</InputLabel>
              <Select
                sx={{ width: "42%" }}
                labelId="Dviratis"
                id="bicycle"
                value={bicycleInputValue}
                onChange={bicycleChangeHandler}
              >
                {config.BICYCLE.map((itm) => (
                  <MenuItem value={`${itm}`}>{itm}</MenuItem>
                ))}
              </Select>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <InputLabel id="race-group">Grupė</InputLabel>
            <Select
              sx={{ width: "45%" }}
              labelId="Grupė"
              id="race-group"
              value={raceGroupInputValue}
              onChange={groupChangeHandler}
            >
              {config.GROUP.map((itm) => (
                <MenuItem value={`${itm}`}>{itm}</MenuItem>
              ))}
            </Select>
          </Box>
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
