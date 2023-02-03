import { useEffect, useMemo, useState, forwardRef, useContext } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

type submitions = {
  id: "string";
  "البريد الاكتروني": string;
  الاهتمام: string;
  الجامعة: string;
  التخصص: string;
  "لمعدل التراكمي": string;
  "اسم المتقدم": string;
};

export default function StudentSubmitionList() {
  const [submitions, setSubmitions] = useState([{} as submitions]);
  const [student, setStudent] = useState("");
  const [gpa, setGpa] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [studentID, setStudentID] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const colums = useMemo(
    () => [
      { field: "اسم المتقدم", header: "اسم المتقدم", width: 160 },
      { field: "لمعدل التراكمي", header: "لمعدل التراكمي", width: 160 },
      { field: "التخصص", header: "التخصص", width: 160 },
      { field: "الجامعة", header: "الجامعة", width: 160 },
      { field: "الاهتمام", header: "الاهتمام", width: 160 },
      { field: "البريد الاكتروني", header: "البريد الاكتروني", width: 200 },
      { field: "id", header: "ID", width: 60 },
    ],
    []
  );
  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => {
    setOpenAlert(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleCompanySubmition = async () => {
    const acessToken = JSON.parse(localStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url = `https://localhost:8080/submition/accept-student/`;
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };
    const studentInfo = {
      studentID: studentID,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(studentInfo as any),
    });

    if (response.status === 200) {
      console.log("good");
      setOpen(false);
      handleClick();
    } else {
      alert("something went wrong");
    }
  };

  const getstudentList = async () => {
    const acessToken = JSON.parse(localStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url = "https://localhost:8080/submition/get-student-list-submitions/";
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };
    axios
      .get(url, { headers })
      .then((res: any) => {
        setSubmitions(
          res.data.filter((object: any) => JSON.stringify(object) !== "{}")
        );
      })
      .catch((error: any) => {
        alert(error);
        console.log(error);
      });
  };

  const handleOpenDialogInformation = (id: string) => {
    const newArray = submitions.find((object) => object.id === id);
    setStudent(newArray?.["اسم المتقدم"] as any);
    setGpa(newArray?.["لمعدل التراكمي"] as any);
    setMajor(newArray?.التخصص as any);
    setUniversity(newArray?.الجامعة as any);
    setStudentID(newArray?.id as any);
    console.log(newArray);
  };

  useEffect(() => {
    getstudentList();
  }, []);

  return (
    <>
      <Box
        component={"div"}
        sx={{
          height: 730,
          width: "81%",
          marginTop: 9,

          backgroundColor: "#EFF5F5",
        }}
      >
        <>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: 450, height: 50 }}
            >
              تم التقديم
            </Alert>
          </Snackbar>
        </>

        <DataGrid
          onRowClick={(e: any) => {
            handleOpenDialogInformation(e.row.id);
            setOpen(true);
          }}
          pageSize={3}
          columns={colums}
          rows={submitions}
          getRowId={(row) => row.id + 1}
          sx={{ fontSize: 20, margin: 2, direction: "rtl" }}
        />
      </Box>
      <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        sx={{ direction: "rtl" }}
      >
        <DialogTitle>معلومات المتقدم</DialogTitle>
        <DialogContent>
          <DialogContentText> اسم المتقدم : {student}</DialogContentText>
          <DialogContentText>المعدل التراكمي : {gpa}</DialogContentText>
          <DialogContentText>التخصص : {major}</DialogContentText>
          <DialogContentText>الجامعة : {university}</DialogContentText>
          <Box></Box>
        </DialogContent>
        <DialogActions>
          <Box width={"100%"} display="flex" justifyContent="space-between">
            <Button
              onClick={() => handleCompanySubmition()}
              variant="contained"
              sx={{
                fontSize: 20,
                width: "45%",
                marginBottom: 3,
                backgroundColor: "#3C6255",
                "&:hover": {
                  backgroundColor: "#86C8BC",
                },
              }}
            >
              قبول الطلب
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: 20,
                width: "45%",
                marginBottom: 3,
                backgroundColor: "#91091E",
                "&:hover": {
                  backgroundColor: "#FF7878",
                },
              }}
            >
              رفض الطلب
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
