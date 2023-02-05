import { ReactNode, useContext, useState } from "react";
import {
  makeStyles,
  Grid,
  Container,
  Paper,
  Typography,
} from "@material-ui/core";

import { Phone, Assignment, PhoneDisabled } from "@material-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SocketContext from "../context/SocketContext";
import { Button, TextField } from "@mui/material";

type props = {
  children: ReactNode;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  marginBottom: {
    marginBottom: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  },
}));

export default function InterViewOptions({ children }: props) {
  const SocketUseContex = useContext(SocketContext);
  const [idToCall, setIDToCall] = useState("");
  const classes = useStyles();
  const {
    currentUserID,
    callAccepted,
    name,
    setName,
    callUser,
    leaveCall,
    callEnded,
  }: any = SocketUseContex;

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                معلومات المتصل
              </Typography>
              <TextField
                color="success"
                variant="standard"
                sx={{
                  textAlign: "revert-layer",
                  direction: "rtl",
                }}
                label="الاسم"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={currentUserID}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                  sx={{
                    marginTop: 4,
                    backgroundColor: "#3C6255",
                    "&:hover": {
                      backgroundColor: "#86C8BC",
                    },
                    fontSize: 20,
                  }}
                >
                  انسخ رقم المقابلة
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                قم بالاتصال
              </Typography>
              <TextField
                color="success"
                variant="standard"
                label="رقم الشخص الذي ترغب في الاتصال"
                value={idToCall}
                onChange={(e) => setIDToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PhoneDisabled fontSize="large" />}
                  fullWidth
                  onClick={leaveCall}
                  sx={{
                    mt: 4,
                    fontSize: 20,
                    backgroundColor: "#3C6255",
                    "&:hover": {
                      backgroundColor: "#86C8BC",
                    },
                  }}
                >
                  اقفل المحادثة
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Phone fontSize="large" />}
                  fullWidth
                  onClick={() => callUser(idToCall)}
                  className={classes.margin}
                  sx={{
                    mt: 4,
                    fontSize: 20,
                    backgroundColor: "#3C6255",
                    "&:hover": {
                      backgroundColor: "#86C8BC",
                    },
                  }}
                >
                  اتصل
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
}
