import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Stack } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function PaymentForm() {
  const [value, setValue] = useState<Dayjs | null>(
    dayjs("2023-02-18T21:11:54")
  );
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        معلومات المهنية
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="اسم الجامعة او بيئة العمل"
            fullWidth
            variant="outlined"
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DateTimePicker
                label="وقت حدوث المشكلة"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
}
