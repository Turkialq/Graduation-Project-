import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function LoginScreen() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${"/Users/turkialqahtani/Desktop/GP2/client/src/assets/background.jpg"})`,
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
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
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#6ECCAF",
                "&:hover": {
                  backgroundColor: "#6ECCAF",
                },
              }}
            >
              دخول
            </Button>
            <Grid container justifyContent={"flex-end"}>
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
