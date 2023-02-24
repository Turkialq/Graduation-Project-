import { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FileUpload from "../components/fileupload/FileUpload";
import axios from "axios";

export default function UploadTasks() {
  const [task, setTask] = useState("");

  const [personName, setPersonName] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const [listOfNames, setListOfNames] = useState([] as any);

  const [value, setValue] = useState<Dayjs | null>(
    dayjs("2023-02-18T21:11:54")
  );

  const handleSelectChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const handleTaskUpload = () => {
    console.log(task, personName, description, value);
  };

  const getStudentNames = async () => {
    const acessToken = JSON.parse(sessionStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url =
      "https://localhost:8080/university-supervisor/get-university-supervisor-student-names/";
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };
    axios
      .get(url, { headers })
      .then((res: any) => {
        console.log(res.data);
        var names = res.data.map(function (item: any) {
          return item["firstName"];
        });
        setListOfNames(names);
      })
      .catch((error: any) => {
        alert(error);
        console.log(error);
      });
  };

  useEffect(() => {
    getStudentNames();
  }, []);

  return (
    <>
      <Box
        sx={{
          marginTop: 5,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#D6E4E5",
          borderRadius: 4,
          boxshadow: 12,
          padding: 3,
          width: "90%",
          // minWidth: 900,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#3C6255" }}>
          <AssignmentIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          انشاء مهمة
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                dir="rtl"
                color="success"
                required
                fullWidth
                id="اسم المهمة"
                label="اسم المهمة"
                autoFocus
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setTask(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DateTimePicker
                    label="موعد التسليم"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>

            <FormControl
              color="success"
              sx={{ marginTop: 1, marginLeft: 2, width: "100%" }}
            >
              <InputLabel>الطلاب المحددين</InputLabel>
              <Select
                color="success"
                multiple
                value={personName}
                onChange={handleSelectChange}
                input={<OutlinedInput label="الطلاب المحددين" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {listOfNames.map((name: string) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      color="success"
                      checked={personName.indexOf(name) > -1}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid item xs={12}>
              <TextField
                dir="rtl"
                color="success"
                fullWidth
                label="وصف المهمة"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <div className="all">
          <div className="box">
            <h2 className="header">تحميل الملفات</h2>
            <FileUpload
              task={task}
              description={description}
              personName={personName}
              value={value}
              onFileChange={(files: any) => console.log(files)}
            />
          </div>
        </div>
      </Box>
    </>
  );
}
