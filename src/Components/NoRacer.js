import { Box, Typography } from "@mui/material";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

const NoRacer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DoNotDisturbOnIcon style={{ color: "red", marginRight: "1rem" }} />
      <Typography variant="h5">Nėra dalyvių</Typography>
      <DoNotDisturbOnIcon style={{ color: "red", marginLeft: "1rem" }} />
    </Box>
  );
};

export default NoRacer;
