import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Skeleton, Typography, IconButton } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import FileUpload from "../components/fileupload/FileUpload";
import "../App.css";

export default function WeeklyTasks() {
  const [listOfTasks, setListOfTasks] = useState([{} as any]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleTaskClick = () => {
    navigate("/task-preview");
  };

  const getTasks = async () => {
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
        console.log(error);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Box marginLeft={2} marginTop={10} sx={{ backgroundColor: "#EFF5F5" }}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(15, 1fr)"
        gridAutoRows="150px"
        gap="20px"
        sx={{ marginTop: 10 }}
      >
        <Box
          component="div"
          gridColumn="span 12"
          gridRow="span 1"
          sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
        >
          <>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              padding={2}
            >
              <Typography marginTop={1} fontSize={30}>
                الواجب الاول
              </Typography>

              <IconButton
                onClick={() => {
                  handleTaskClick();
                }}
              >
                <UploadFileIcon sx={{ fontSize: 55 }} />
              </IconButton>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              padding={1}
              sx={{ marginRight: 2 }}
            >
              <Typography fontSize={20}> تاريخ التسليم : ٢٠٢٣/٢/٤</Typography>
            </Box>
          </>
        </Box>
        <Box
          component="div"
          gridColumn="span 12"
          gridRow="span 1"
          sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
        >
          <>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              padding={2}
            >
              <Typography marginTop={1} fontSize={30}>
                الواجب الاول
              </Typography>

              <IconButton>
                <UploadFileIcon sx={{ fontSize: 55 }} />
              </IconButton>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              padding={1}
              sx={{ marginRight: 2 }}
            >
              <Typography fontSize={20}> تاريخ التسليم : ٢٠٢٣/٢/٤</Typography>
            </Box>
          </>
        </Box>
        <Box
          component="div"
          gridColumn="span 12"
          gridRow="span 1"
          sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
        >
          <>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              padding={2}
            >
              <Typography marginTop={1} fontSize={30}>
                الواجب الاول
              </Typography>

              <IconButton>
                <UploadFileIcon sx={{ fontSize: 55 }} />
              </IconButton>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              padding={1}
              sx={{ marginRight: 2 }}
            >
              <Typography fontSize={20}> تاريخ التسليم : ٢٠٢٣/٢/٤</Typography>
            </Box>
          </>
        </Box>
        <Box
          component="div"
          gridColumn="span 12"
          gridRow="span 1"
          sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
        >
          <>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              padding={2}
            >
              <Typography marginTop={1} fontSize={30}>
                الواجب الاول
              </Typography>

              <IconButton>
                <UploadFileIcon sx={{ fontSize: 55 }} />
              </IconButton>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              padding={1}
              sx={{ marginRight: 2 }}
            >
              <Typography fontSize={20}> تاريخ التسليم : ٢٠٢٣/٢/٤</Typography>
            </Box>
          </>
        </Box>
        <Box
          component="div"
          gridColumn="span 12"
          gridRow="span 1"
          sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
        >
          <>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              padding={2}
            >
              <Typography marginTop={1} fontSize={30}>
                الواجب الاول
              </Typography>

              <IconButton>
                <UploadFileIcon sx={{ fontSize: 55 }} />
              </IconButton>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              padding={1}
              sx={{ marginRight: 2 }}
            >
              <Typography fontSize={20}> تاريخ التسليم : ٢٠٢٣/٢/٤</Typography>
            </Box>
          </>
        </Box>
      </Box>
    </Box>
  );
}
