import React, { useContext } from "react";
import { Button } from "@mui/material";

import SocketContext from "../context/SocketContext";

export default function InterViewNotifications() {
  const { answerCall, call, callAccepted }: any = useContext(SocketContext);
  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={answerCall}
            sx={{
              width: "50%",
              backgroundColor: "#3C6255",
              "&:hover": {
                backgroundColor: "#86C8BC",
              },
              fontSize: 20,
            }}
          >
            اقبل
          </Button>
          <h1> : {call.name} يتصل بك الان</h1>
        </div>
      )}
    </>
  );
}
