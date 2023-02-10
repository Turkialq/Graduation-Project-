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
import AuthContext from "../context/AuthContext";

type companyList = {
  field: string;
  id: number;
  location: string;
  name: string;
  type: string;
};

export default function CompanyListScreen() {
  const [companyList, setCompanyList] = useState([{} as companyList]);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [selectedCompanyField, setSelectedCompanyField] = useState("");
  const [selectedCompanyLocation, setSelectedCompanyLocation] = useState("");
  const [selectedCompanyType, setSelectedCompanyType] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const { userRole }: any = useContext(AuthContext);

  const colums = useMemo(
    () => [
      { field: "name", header: "Name", width: 260 },
      { field: "type", header: "Type", width: 260 },
      { field: "field", header: "Field", width: 260 },
      { field: "location", header: "Location", width: 260 },
      { field: "id", header: "ID", width: 260 },
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
    const params = new URLSearchParams();
    params.set("companyName", selectedCompanyName);
    const acessToken = JSON.parse(sessionStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url = `https://localhost:8080/student/submit-company/?${params.toString()}`;
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
    });
    if (response.status === 200) {
      console.log("good");
      setOpen(false);
      handleClick();
    } else {
      alert("something went wrong");
    }
  };

  const getCompanyList = async () => {
    const acessToken = JSON.parse(sessionStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url = "https://localhost:8080/student/get-company-list/";
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };
    axios
      .get(url, { headers })
      .then((res: any) => {
        setCompanyList(res.data);
        console.log(res.data);
      })
      .catch((error: any) => {
        alert(error);
      });
  };

  const getstudentList = async () => {
    const acessToken = JSON.parse(sessionStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url = "https://localhost:8080/student/get-submition-lists/";
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };
    axios
      .get(url, { headers })
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((error: any) => {
        alert(error);
      });
  };

  useEffect(() => {
    getCompanyList();
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
            setSelectedCompanyName(e.row.name);
            setSelectedCompanyField(e.row.field);
            setSelectedCompanyLocation(e.row.location);
            setSelectedCompanyType(e.row.type);
            setOpen(true);
          }}
          pageSize={12}
          columns={colums}
          rows={companyList}
          getRowId={(row) => row.id + 1}
          sx={{ fontSize: 20, margin: 2 }}
        />
      </Box>
      <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        sx={{ direction: "rtl" }}
      >
        <DialogTitle>تقديم على الجهة</DialogTitle>
        <DialogContent>
          <DialogContentText>الجهة : {selectedCompanyName}</DialogContentText>
          <DialogContentText>
            الاختصاص : {selectedCompanyField}
          </DialogContentText>
          <DialogContentText>القطاع : {selectedCompanyType}</DialogContentText>
          <DialogContentText>
            المناطق : {selectedCompanyLocation}
          </DialogContentText>
          <Box></Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCompanySubmition()}
            variant="contained"
            sx={{
              fontSize: 20,
              width: "100%",
              marginBottom: 3,
              backgroundColor: "#3C6255",
              "&:hover": {
                backgroundColor: "#86C8BC",
              },
            }}
          >
            قدم
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
