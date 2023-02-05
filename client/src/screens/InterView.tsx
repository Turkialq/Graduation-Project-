import React from "react";
import { Typography, AppBar, Theme } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import InterViewNotifications from "../components/InterViewNotifications";
import InterViewOptions from "../components/InterViewOptions";
import VideoPlayer from "../components/VideoPlayer";

const useStyles = makeStyles(
  (theme: { breakpoints: { down: (arg0: string) => any } }) => ({
    appBar: {
      borderRadius: 15,
      margin: "30px 100px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "600px",
      border: "2px solid black",

      [theme.breakpoints.down("xs")]: {
        width: "90%",
      },
    },
    image: {
      marginLeft: "15px",
    },
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
  })
);

export default function InterView() {
  return (
    <div
      style={{
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <AppBar
        position="static"
        color="inherit"
        sx={{
          borderRadius: 15,
          margin: "30px 100px 30px -100px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "600px",
          border: "2px solid black",
        }}
      >
        <Typography variant="h2" align="center">
          مقابلة الشخصية
        </Typography>
      </AppBar>
      <VideoPlayer />
      <InterViewOptions>
        <InterViewNotifications />
      </InterViewOptions>
    </div>
  );
}
