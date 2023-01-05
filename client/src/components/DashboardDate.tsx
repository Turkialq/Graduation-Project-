import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";

export default function DashboardDate() {
  const [date, setDate] = useState<Dayjs | null>(dayjs("2023-04-07"));

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CalendarPicker
              date={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
}
