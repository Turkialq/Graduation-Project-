import react, {
  useState,
  useEffect,
  useContext,
  ChangeEvent,
  FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AuthContext from "../context/AuthContext";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import Image from "../assets/background.png";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [button, setButton] = useState<boolean>(true);
  const [role, setRole] = useState<string>("");

  const navigate = useNavigate();

  const { loginUser, user }: any = useContext(AuthContext);

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (email.length > 4 && password.length > 5 && email.includes("@")) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [password, email]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item md={7} sm={5} xs={1}>
        <img style={{ width: 700, height: 700 }} src={Image} />
      </Grid>
      <Grid item xs={11} sm={5} md={5} component={Paper} elevation={20}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            تسجيل الدخول
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e: FormEvent<HTMLFormElement>) =>
              loginUser(e, email, password, role)
            }
            sx={{ mt: 1 }}
          >
            <FormControl
              style={{
                marginTop: 10,
                textAlign: "right",
                width: "100%",
              }}
            >
              <FormLabel component="legend" color="primary">
                مهنة
              </FormLabel>
              <RadioGroup
                name="role"
                style={{ display: "initial" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setRole(e.target.value);
                }}
              >
                <FormControlLabel
                  dir="ltr"
                  value="companySupervisor"
                  control={<Radio />}
                  label="مسؤل بيئة العمل "
                />
                <FormControlLabel
                  dir="ltr"
                  value="uniSupervisor"
                  control={<Radio />}
                  label="استاذ جامعي"
                />
                <FormControlLabel
                  dir="ltr"
                  value="student"
                  control={<Radio color="secondary" />}
                  label="طالب"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              label="اسم المستخدم"
              name="email"
              autoComplete="off"
              autoFocus
              color="success"
              InputProps={{
                inputProps: {
                  style: { textAlign: "right" },
                },
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="كلمة المرور"
              type="password"
              id="password"
              color="success"
              InputProps={{
                inputProps: {
                  style: { textAlign: "right" },
                },
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handlePassword(e);
              }}
            />

            <Button
              disabled={button}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#3C6255",
                "&:hover": {
                  backgroundColor: "#86C8BC",
                },
              }}
            >
              دخول
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="/register"
                  variant="body2"
                  sx={{ color: "#6ECCAF" }}
                >
                  {"ليس لديك حساب في المنصة؟"}
                </Link>
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary" align="center">
              {"حقوق©منصة تدريبي "}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
