import { Grid, Button, Typography } from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

const RacerBtn = ({ raceData, racerNrHandler }) => {
  return (
    <Grid container spacing={6}>
      {raceData &&
        raceData.map((item) => (
          <Grid item xs={2} key={item.dalyvis}>
            <Button
              variant="contained"
              onClick={() => racerNrHandler(item.dalyvis)}
            >
              <Typography>
                <DirectionsBikeIcon />
                {item.dalyvis}
              </Typography>
            </Button>
          </Grid>
        ))}
    </Grid>
  );
};

export default RacerBtn;
