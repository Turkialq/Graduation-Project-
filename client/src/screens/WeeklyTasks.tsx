import { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Box, Skeleton, Typography, IconButton, Link } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import FileUpload from "../components/fileupload/FileUpload";
import "../App.css";

export default function WeeklyTasks() {
  const [listOfTasks, setListOfTasks] = useState([{} as any]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleTaskClick = (path: string) => {
    console.log(path);
    navigate(`/task-preview/${path}`);
  };

  const getTasks = async () => {
    const acessToken = JSON.parse(sessionStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url = "https://localhost:8080/tasks/get-student-tasks/";
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };
    axios
      .get(url, { headers })
      .then((res: any) => {
        console.log(res.data);
        setListOfTasks(res.data);
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
    <Box marginLeft={2} sx={{ backgroundColor: "#EFF5F5" }}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(15, 1fr)"
        gridAutoRows="300px"
        gap="20px"
        sx={{ marginTop: 5 }}
      >
        {listOfTasks.length > 0 &&
          listOfTasks.map((task, index) => {
            console.log(task);
            return (
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
                      المهمة رقم : {index + 1}
                    </Typography>

                    <IconButton
                      onClick={() => {
                        handleTaskClick(task.assignmentPath);
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
                    <Typography fontSize={20}>
                      {task.title} : العنوان
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    padding={1}
                    sx={{ marginRight: 2 }}
                  >
                    <Typography fontSize={20}>
                      {task.description} : الوصف
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    padding={1}
                    sx={{ marginRight: 2 }}
                  >
                    <Typography fontSize={20}>
                      تاريخ التسليم : {task.deadline}
                    </Typography>
                  </Box>
                </>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  padding={1}
                  sx={{ marginRight: 2 }}
                >
                  <Link
                    target="_blank"
                    href={`https://localhost:8080/uploads/${task.assignmentPath}`}
                    variant="body2"
                    sx={{ color: "#6ECCAF", marginLeft: 50 }}
                  >
                    {"ليس لديك حساب في المنصة؟"}
                  </Link>
                </Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}
