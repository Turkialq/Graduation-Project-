import { useState, useEffect, useMemo, useContext } from "react";
import {
  Box,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import StatBox from "../components/StatBox";
import { BarChart } from "../components/dashboard/chart";
import { DataGrid } from "@mui/x-data-grid";
import Skeleton from "@mui/material/Skeleton";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import axios from "axios";
import avtar from "../assets/avtartwo.png";
import AuthContext from "../context/AuthContext";

export default function DashboardScreen() {
  const [loading, setIsLoading] = useState(true);

  const [userName, setUserName] = useState("");
  const [userUniveristy, setUserUniversity] = useState("");
  const [userMajor, setUserMajor] = useState("");

  const [studentGPA, setStudentGPA] = useState("");
  const [studentUniSupervisor, setStudentSupervisor] = useState("");

  const [uniStudents, setUniStudents] = useState([{} as any]);

  const [companyList, setCompanyList] = useState([{} as any]);
  const [companyName, setCompanyName] = useState("");

  const [acceptedStudent, setAcceptedStudent] = useState([{} as any]);
  const [notifications, setNotifications] = useState([{} as any]);

  const { userRole }: any = useContext(AuthContext);

  const colums = useMemo(
    () => [
      { field: "id", header: "ID", width: 260 },
      { field: "حالة الطلب", header: "status", width: 260 },
      { field: "اسم المنشاة", header: "company", width: 260 },
    ],
    []
  );

  const superVisorColums = useMemo(
    () => [
      { field: "id", header: "ID", width: 50 },
      { field: "اسم الطالب", header: "اسم الطالب", width: 140 },
      { field: "البريد الاكتروني", header: "البريد الاكتروني", width: 180 },
      { field: "التخصص", header: "status", width: 100 },
      { field: "الجامعة", header: "company", width: 140 },
      { field: "المعدل التراكمي", header: "لمعدل التراكمي", width: 140 },
    ],
    []
  );

  const uniSupervisorColums = useMemo(
    () => [
      { field: "id", header: "ID", width: 50 },
      { field: "اسم الطالب", header: "اسم الطالب", width: 140 },
      { field: "التخصص", header: "التخصص", width: 180 },
      { field: "بيئة العمل", header: "بيئة العمل", width: 200 },
    ],
    []
  );

  const getStudentInformation = async () => {
    const acessToken = JSON.parse(sessionStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url = "https://localhost:8080/student/student-dashboard-information";
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

  const getUniversitySupervisorInformation = async () => {
    const acessToken = JSON.parse(sessionStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url =
      "https://localhost:8080/university-supervisor/get-university-supervisor-dashboard-information";
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };
    axios
      .get(url, { headers })
      .then((res: any) => {
        setUserName(res.data.name + " " + res.data.lastName);
        setUserUniversity(res.data.uniName);
        setUserMajor(res.data.major);
        console.log(res.data);
      })
      .catch((error: any) => {
        alert(error);
        console.log(error);
      });
  };

  const getCompanySupervisorInformation = async () => {
    const acessToken = JSON.parse(sessionStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url =
      "https://localhost:8080/supervisor/company-supervisor-dashboard-information";
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };
    axios
      .get(url, { headers })
      .then((res: any) => {
        console.log(res.data);
        setUserName(res.data.firstName + " " + res.data.lastName);
        setCompanyName(res.data.companyName);
      })
      .catch((error: any) => {
        alert(error);
        console.log(error);
      });
  };

  const getUserNotifications = async () => {
    var url = "";
    // refactor use switch
    if (userRole === "student") {
      url = "https://localhost:8080/notification/get-student-notifications/";
    } else if (userRole === "companySupervisor") {
      url =
        "https://localhost:8080/notification/get-company-supervisor-notifications/";
    } else {
      url =
        "https://localhost:8080/notification/get-student-supervisor-notifications/";
    }
    const acessToken = JSON.parse(sessionStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };
    axios
      .get(url, { headers })
      .then((res: any) => {
        setIsLoading(false);
        setNotifications(res.data);
      })
      .catch((error: any) => {
        alert(error);
        console.log(error);
      });
  };

  const getStudentSubmitions = async () => {
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
        if (res.data.length > 0) {
          setIsLoading(false);
          setCompanyList(res.data);
        }
      })
      .catch((error: any) => {
        alert(error);
        console.log(error);
      });
  };

  const getAccpetedStudent = async () => {
    const acessToken = JSON.parse(sessionStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url = "https://localhost:8080/submition/get-accpeted-student/";
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };
    axios
      .get(url, { headers })
      .then((res: any) => {
        console.log(res.data);
        if (res.data.length > 0) {
          setIsLoading(false);
          setAcceptedStudent(
            res.data.filter((object: any) => JSON.stringify(object) !== "{}")
          );
          console.log(acceptedStudent);
        }
      })
      .catch((error: any) => {
        alert(error);
        console.log(error);
      });
  };

  const getUniversitySupervisorStudents = async () => {
    const acessToken = JSON.parse(sessionStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url =
      "https://localhost:8080/university-supervisor/get-university-supervisor-students/";
    const headers = {
      "Content-Type": "application/json",
      authorization: "Bearer" + " " + acessToken,
    };
    axios
      .get(url, { headers })
      .then((res: any) => {
        console.log(res.data);
        if (res.data.length > 0) {
          setIsLoading(false);
          setUniStudents(
            res.data.filter((object: any) => JSON.stringify(object) !== "{}")
          );
          console.log(acceptedStudent);
        }
      })
      .catch((error: any) => {
        alert(error);
        console.log(error);
      });
  };

  useEffect(() => {
    if (userRole === "student") {
      getStudentInformation();
      getStudentSubmitions();
      getUserNotifications();
    }
    if (userRole === "companySupervisor") {
      getCompanySupervisorInformation();
      getUserNotifications();
      getAccpetedStudent();
    }
    if (userRole === "uniSupervisor") {
      getUniversitySupervisorInformation();
      getUniversitySupervisorStudents();
      getUserNotifications();
    }
  }, [userRole]);

  return (
    <>
      <Box
        marginLeft={2}
        marginTop={"30px"}
        sx={{ backgroundColor: "#EFF5F5" }}
      >
        {/* GRID & CHARTS */}

        <Box
          display="grid"
          gridTemplateColumns="repeat(15, 1fr)"
          gridAutoRows="150px"
          gap="20px"
        >
          {/* USER INFO */}

          {userRole === "student" && (
            <Box
              component="div"
              gridColumn="span 9"
              gridRow="span 1"
              display="flex"
              justifyContent="flex-end"
              sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
            >
              <Box
                component="img"
                sx={{
                  backGroundColor: "black",
                  height: 120,
                  width: 100,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                  borderRadius: 4,
                  marginRight: { md: "20px", lg: "120px", xl: "210px" },
                }}
                alt="The house from the offer."
                src={avtar}
              />
              <Box width={"45%"} marginLeft={34}>
                <Typography
                  marginTop={2}
                  color={"black"}
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginLeft: { xl: 29, lg: 10 } }}
                >
                  اسم الطالب: {userName}
                </Typography>
                <Typography
                  color={"black"}
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginLeft: { xl: 19, lg: 1 } }}
                >
                  الجامعة : {userUniveristy}
                </Typography>
                <Typography
                  color={"black"}
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginLeft: { xl: 35, lg: 16 } }}
                >
                  المعدل التراكمي: {studentGPA}
                </Typography>
              </Box>
            </Box>
          )}

          {userRole === "companySupervisor" && (
            <Box
              component="div"
              gridColumn="span 9"
              gridRow="span 1"
              display="flex"
              justifyContent="flex-end"
              sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
            >
              <Box
                component="img"
                sx={{
                  backGroundColor: "black",
                  height: 120,
                  width: 100,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                  borderRadius: 4,
                  marginRight: { md: "20px", lg: "120px", xl: "210px" },
                }}
                alt="The house from the offer."
                src={avtar}
              />
              <Box width={"45%"} marginLeft={34}>
                <Typography
                  marginLeft={10}
                  marginTop={2}
                  color={"black"}
                  variant="h5"
                  fontWeight="600"
                >
                  اسم مسئول العمل: {userName}
                </Typography>
                <Typography
                  marginLeft={10}
                  marginTop={1}
                  color={"black"}
                  variant="h5"
                  fontWeight="600"
                >
                  بيئة العمل : {companyName}
                </Typography>
              </Box>
            </Box>
          )}

          {userRole === "uniSupervisor" && (
            <Box
              component="div"
              gridColumn="span 9"
              gridRow="span 1"
              display="flex"
              justifyContent="flex-end"
              sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
            >
              <Box
                component="img"
                sx={{
                  backGroundColor: "black",
                  height: 120,
                  width: 100,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                  borderRadius: 4,
                  marginRight: { md: "20px", lg: "120px", xl: "210px" },
                }}
                alt="The house from the offer."
                src={avtar}
              />
              <Box width={"45%"} marginLeft={34}>
                <Typography
                  marginTop={2}
                  color={"black"}
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginLeft: { xl: 22, lg: 7 } }}
                >
                  اسم استاذ الجامعة : {userName}
                </Typography>
                <Typography
                  marginTop={1}
                  color={"black"}
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginLeft: { xl: 20, lg: 5 } }}
                >
                  الجامعة : {userUniveristy}
                </Typography>
                <Typography
                  marginTop={1}
                  color={"black"}
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginLeft: { xl: 30, lg: 15 } }}
                >
                  التخصص : {userMajor}
                </Typography>
              </Box>
            </Box>
          )}

          {/* USER NOTIFICATIONS */}
          {userRole === "student" && (
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
                    sx={{
                      color: "black",
                      fontSize: "26px",
                      marginTop: 1,
                      marginLeft: 26,
                      marginBottom: 2,
                    }}
                  />
                }
              />
              {loading ? (
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
              ) : (
                <Grid marginTop={4} overflow="auto">
                  <>
                    {notifications.map((not) => {
                      return (
                        <ListItem
                          sx={{ padding: 2, marginRight: -5 }}
                          key={not.id}
                          button
                        >
                          <ListItemText
                            sx={{
                              width: "50%",
                              textAlign: "right",
                            }}
                            primary={`${not.title}`}
                            secondary={`${not.subTitle}`}
                          />
                          <ListItemIcon sx={{ marginLeft: 2 }}>
                            <RadioButtonCheckedIcon sx={{ color: "black" }} />
                          </ListItemIcon>
                        </ListItem>
                      );
                    })}
                  </>
                </Grid>
              )}
            </Box>
          )}

          {userRole === "uniSupervisor" && (
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
                    sx={{
                      color: "black",
                      fontSize: "26px",
                      marginTop: 1,
                      marginLeft: 26,
                      marginBottom: 2,
                    }}
                  />
                }
              />
              {loading ? (
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
              ) : (
                <Grid marginTop={4} overflow="auto">
                  <>
                    {notifications.map((not) => {
                      return (
                        <ListItem
                          sx={{ padding: 2, marginRight: -5 }}
                          key={not.id}
                          button
                        >
                          <ListItemText
                            sx={{
                              width: "50%",
                              textAlign: "right",
                            }}
                            primary={`${not.title}`}
                            secondary={`${not.subTitle}`}
                          />
                          <ListItemIcon sx={{ marginLeft: 2 }}>
                            <RadioButtonCheckedIcon sx={{ color: "black" }} />
                          </ListItemIcon>
                        </ListItem>
                      );
                    })}
                  </>
                </Grid>
              )}
            </Box>
          )}

          {userRole === "companySupervisor" && (
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
                    sx={{
                      color: "black",
                      fontSize: "26px",
                      marginTop: 1,
                      marginLeft: 26,
                      marginBottom: 2,
                    }}
                  />
                }
              />
              {loading ? (
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
              ) : (
                <Grid marginTop={4} overflow="auto">
                  <>
                    {notifications.map((not) => {
                      return (
                        <ListItem
                          sx={{ padding: 2, marginRight: 4 }}
                          key={not.id}
                          button
                        >
                          <ListItemText
                            sx={{
                              width: "50%",
                              textAlign: "right",
                            }}
                            primary={`${not.title}`}
                            secondary={`${not.subTitle}`}
                          />
                          <ListItemIcon sx={{ marginLeft: 2 }}>
                            <RadioButtonCheckedIcon sx={{ color: "black" }} />
                          </ListItemIcon>
                        </ListItem>
                      );
                    })}
                  </>
                </Grid>
              )}
            </Box>
          )}

          {/* USER DATAGRID INFO */}
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
              p="2px"
              sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
            >
              {userRole === "student" && (
                <>
                  <Box sx={{ height: "33vh", width: "100%" }}>
                    <DataGrid
                      autoPageSize
                      columns={colums}
                      rows={companyList}
                      getRowId={(row) => row.id + 1}
                      sx={{
                        fontSize: 20,
                        margin: 2,
                        boxShadow: 3,
                      }}
                    />
                  </Box>
                </>
              )}

              {userRole === "companySupervisor" && (
                <>
                  <Box sx={{ height: "33vh", width: "100%", direction: "rtl" }}>
                    <DataGrid
                      autoPageSize
                      columns={superVisorColums}
                      rows={acceptedStudent}
                      getRowId={(row) => row.id + 1}
                      sx={{
                        fontSize: 20,
                        margin: 2,
                        boxShadow: 3,
                      }}
                    />
                  </Box>
                </>
              )}

              {userRole === "uniSupervisor" && (
                <>
                  <Box sx={{ height: "33vh", width: "100%", direction: "rtl" }}>
                    <DataGrid
                      autoPageSize
                      columns={uniSupervisorColums}
                      rows={uniStudents}
                      getRowId={(row) => row.id + 1}
                      sx={{
                        fontSize: 20,
                        margin: 2,
                        boxShadow: 3,
                      }}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Box>

          {/* ROW 3 */}
          <Box
            component="div"
            gridColumn="span 12"
            gridRow="span 2"
            p="10px"
            sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
          >
            {/* <Chart /> */}
            <BarChart />
          </Box>
        </Box>
      </Box>
    </>
  );
}
