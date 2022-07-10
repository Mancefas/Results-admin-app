import { Grid, Button, Typography } from "@mui/material";

const RacerBtn = ({ raceData, racerNrHandler }) => {
  return (
    <>
      <Grid container spacing={2}>
        {raceData.map((item) => (
          <Grid item xs={4} key={item.dalyvis}>
            <Button
              variant="contained"
              onClick={() => racerNrHandler(item.dalyvis)}
            >
              <Typography>{item.dalyvis}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RacerBtn;
