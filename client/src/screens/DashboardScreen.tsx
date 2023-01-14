import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import StatBox from "../components/StatBox";
import Chart, { BarChart } from "../components/dashboard/chart";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";

export default function DashboardScreen() {
  const [userName, setUserName] = useState("");
  const [userUniveristy, setUserUniversity] = useState("");
  const [userWorkPlace, setUserWorkPlace] = useState("");
  const [studentGPA, setStudentGPA] = useState("");
  const [studentUniSupervisor, setStudentSupervisor] = useState("");
  const [studentPriSupervisor, setStudentPriSupervisor] = useState("");
  const [companyNames, setCompanyNames] = useState([{}]);

  const getStudentInformation = async () => {
    const acessToken = JSON.parse(localStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url = "http://localhost:8080/student/student-dashboard-information";
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };
    axios
      .get(url, { headers })
      .then((res: any) => {
        setUserName(res.data.studentFirstName + " " + res.data.studentLastName);
        setStudentGPA(res.data.studentGPA);
        setUserUniversity(res.data.studentUniversity);
        setStudentSupervisor(res.data.studentUniSupervisor);
      })
      .catch((error: any) => {
        alert(error);
        console.log(error);
      });
  };

  useEffect(() => {
    getStudentInformation();
  }, []);

  return (
    <>
      <Box marginLeft={2} marginTop={10} sx={{ backgroundColor: "#EFF5F5" }}>
        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(15, 1fr)"
          gridAutoRows="150px"
          gap="20px"
          sx={{ marginTop: 10 }}
        >
          {/* ROW 1 */}
          <Box
            component="div"
            gridColumn="span 9"
            gridRow="span 1"
            display="flex"
            justifyContent="flex-end"
            sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
          >
            <Box padding={2} marginRight={12}>
              <Skeleton variant="circular" width={80} height={80} />
            </Box>
            <Box width={"45%"} marginLeft={34}>
              <Typography
                marginLeft={15}
                marginTop={2}
                color={"black"}
                variant="h5"
                fontWeight="600"
              >
                اسم الطالب: {userName}
              </Typography>
              <Typography
                marginLeft={15}
                color={"black"}
                variant="h5"
                fontWeight="600"
              >
                الجامعة : {userUniveristy}
              </Typography>
              <Typography
                marginLeft={22}
                color={"black"}
                variant="h5"
                fontWeight="600"
              >
                المعدل التراكمي: {studentGPA}
              </Typography>
            </Box>
          </Box>

          <Box
            component="div"
            gridColumn="span 3"
            gridRow="span 3"
            display="flex"
            sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
          >
            <StatBox
              icon={
                <NotificationsActiveIcon
                  sx={{ color: "black", fontSize: "26px", marginTop: 2 }}
                />
              }
            />
            <Box sx={{ width: 230, marginTop: 7 }}>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </Box>

          {/* ROW 2 */}
          <Box
            component="div"
            gridColumn="span 9"
            gridRow="span 2"
            overflow="auto"
            sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
          >
            <Box
              component="div"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px${"#141b2d"}`}
              p="15px"
              sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
            >
              <Box sx={{ width: "75%", marginTop: 10, marginLeft: 12 }}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
              <Box marginTop={-30}>
                <Typography color={"black"} variant="h5" fontWeight="600">
                  حالة الطلب
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ROW 3 */}
          <Box
            component="div"
            gridColumn="span 8"
            gridRow="span 2"
            p="10px"
            sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
          >
            <Chart />
          </Box>
          <Box
            component="div"
            gridColumn="span 4"
            gridRow="span 2"
            p="5px"
            sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
          >
            <BarChart />
          </Box>
        </Box>
      </Box>
    </>
  );
}
