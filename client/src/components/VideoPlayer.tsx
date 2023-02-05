import { useContext } from "react";
import { Typography, Paper, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";

import SocketContext from "../context/SocketContext";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "450px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "left",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    marginLeft: "80px",
  },
}));

export default function VideoPlayer() {
  const {
    name,
    callAccepted,
    myVidoe,
    userVidoe,
    callEnded,
    stream,
    call,
  }: any = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {/* caller screen */}
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "namesss"}
            </Typography>
            <video
              playsInline
              ref={myVidoe}
              muted
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}

      {/* reciver screen */}
      {callAccepted && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6} sx={{ borderRadius: 20 }}>
            <Typography variant="h5" gutterBottom>
              {call.name || "name"}
            </Typography>
            <video
              playsInline
              ref={userVidoe}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
}
