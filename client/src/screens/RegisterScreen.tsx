import React from "react";
import { Grid, Paper, Avatar, Typography, TextField } from "@material-ui/core";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function Signup() {
  return (
    <Grid>
      <Paper
        elevation={20}
        style={{ padding: "30px 20px", width: 400, margin: "100px auto" }}
      >
        <Grid>
          <Avatar style={{ backgroundColor: "#1bbd7e" }}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={{ margin: 0 }}>Sign Up</h2>
        </Grid>
        <form>
          <TextField fullWidth label="Name" placeholder="Enter your name" />
          <TextField fullWidth label="Email" placeholder="Enter your email" />
          <FormControl component="fieldset" style={{ marginTop: 10 }}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              style={{ display: "initial" }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="Enter your phone number"
          />
          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            placeholder="Confirm your password"
          />
          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#6ECCAF",
              "&:hover": {
                backgroundColor: "#6ECCAF",
              },
            }}
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}
