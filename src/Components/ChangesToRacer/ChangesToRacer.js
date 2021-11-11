import React from "react";
import { Container, TextField, Box, Button } from "@mui/material";

const ChangesToRacer = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        textAlign: "center",
        height: "fit-content",
      }}
    >
      <Box>
        <TextField label="Vardas"></TextField>
      </Box>
      <Box>
        <TextField label="Naujas laikas"></TextField>
      </Box>
    </Container>
  );
};

export default ChangesToRacer;
