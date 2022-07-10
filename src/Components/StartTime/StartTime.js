import React, { useState, useEffect, useContext } from "react";

import { Container, Alert, LinearProgress } from "@mui/material";

import config from "../../config.json";
import AuthContext from "../../store/auth-context";

import RacerBtn from "../RacerBtn";
import NoRacer from "../NoRacer";

const StartTime = () => {
  const context = useContext(AuthContext);
  const [racerNR, setRacerNr] = useState();
  const [newTime, setNewTime] = useState();
  const [dataOfAllResults, setDataOfAllResults] = useState();
  const [dataWithNoStartTime, setDataWithNoStartTime] = useState([]);

  const [loadingMessage, setLoadingMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [noRacers, setNoRacers] = useState(false);

  // functions to show only one message at the time
  const loadingMessageHandler = () => {
    setLoadingMessage(true);
    setSuccessMessage(false);
    setErrorMessage(false);
  };
  const sucessMessageHandler = () => {
    setLoadingMessage(false);
    setSuccessMessage(true);
    setErrorMessage(false);
  };
  const errorMessageHandler = (message) => {
    setLoadingMessage(false);
    setSuccessMessage(false);
    setErrorMessage(message);
  };

  //show success or error message only for few seconds
  useEffect(() => {
    setTimeout(() => {
      if (successMessage) {
        setSuccessMessage(false);
        fetchindData();
      }
      if (errorMessage) {
        setErrorMessage(false);
      }
    }, 2500);
    return () => {
      clearTimeout();
    };
    // eslint-disable-next-line
  }, [successMessage, errorMessage]);

  // Get data of all racers
  const fetchindData = async () => {
    try {
      const response = await fetch(config.API_URL_RACERS);
      const data = await response.json();
      const dataToArrayOfObjects = [];
      for (const key in data) {
        dataToArrayOfObjects.push({
          id: key,
          dalyvis: data[key].startoNr,
          start: data[key].startoLaikas,
        });
      }
      if (response.ok) {
        setDataOfAllResults(dataToArrayOfObjects);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorMessageHandler(error.message);
    }
  };
  useEffect(() => {
    fetchindData();
    // eslint-disable-next-line
  }, []);

  // sort data to get only id that don't have race start time
  const getDataWithNoStartTime = () => {
    const sorted = dataOfAllResults.filter(
      (number) => number.start === undefined
    );
    if (sorted.length === 0) {
      setNoRacers(true);
    } else {
      setDataWithNoStartTime(sorted);
    }
  };
  useEffect(() => {
    if (!dataOfAllResults) {
      return;
    }
    getDataWithNoStartTime();
    // eslint-disable-next-line
  }, [dataOfAllResults]);

  // add starting time on firebase database
  const addStartTimeToRacer = async () => {
    const startTime = newTime.startoLaikas;
    const racerToAddStartTimeTo = dataOfAllResults.filter(
      (number) => number.dalyvis === racerNR
    );
    const firebaseIdOfRacer = racerToAddStartTimeTo[0].id;
    loadingMessageHandler();

    try {
      const response = await fetch(
        `${config.API_URL_FOR_STARTTIME}${firebaseIdOfRacer}.json?auth=${context.token}`,
        {
          method: "PATCH",
          body: JSON.stringify({ startoLaikas: `${startTime}` }),
        }
      );
      if (response.ok) {
        sucessMessageHandler();
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      errorMessageHandler(error.message);
    }
  };

  useEffect(() => {
    if (!newTime) {
      return;
    }
    addStartTimeToRacer();
    // eslint-disable-next-line
  }, [newTime]);

  // Set starting time to racer
  const racerNrHandler = (number) => {
    setRacerNr(number);
    const raceStart = new Date().getTime();

    const newRaceTime = {
      dalyvis: number,
      startoLaikas: `${raceStart}`,
    };
    setNewTime(newRaceTime);
  };

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          textAlign: "center",
          height: "fit-content",
        }}
      >
        {loadingMessage && (
          <LinearProgress sx={{ width: "50%", margin: "auto" }} />
        )}
        {successMessage && (
          <Alert
            severity="success"
            variant="outlined"
            sx={{ width: "fit-content", margin: "auto" }}
          >
            Laikas paleistas!
          </Alert>
        )}
        {errorMessage && (
          <Alert
            severity="error"
            variant="outlined"
            sx={{ width: "fit-content", margin: "auto" }}
          >
            Klaida! ({errorMessage})
          </Alert>
        )}

        <RacerBtn
          raceData={dataWithNoStartTime}
          racerNrHandler={racerNrHandler}
          name="racerNumber"
        />
        {noRacers && <NoRacer />}
      </Container>
    </>
  );
};

export default StartTime;
