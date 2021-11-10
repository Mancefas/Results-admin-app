import { Container, TextField, Box, Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

let initialLoad = true;

const AddRacer = () => {
  const inputRef = useRef();
  const [racer, setRacer] = useState();

  const formSubmitHanlder = (e) => {
    e.preventDefault();
    console.log(e);

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
    async function sendNewRacer(racer) {
      const response = await fetch(
        "https://gif-rezultatai-b73a6-default-rtdb.europe-west1.firebasedatabase.app/dal.json",
        {
          method: "POST",
          body: JSON.stringify(racer),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    }

    if (initialLoad) {
      initialLoad = false;
      return;
    }

    sendNewRacer(racer);
  }, [racer]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        textAlign: "center",
        height: "fit-content",
      }}
    >
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
