import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import StatBox from "../components/StatBox";
import DatePicker from "../components/dashboard/DatePicker";
import Chart, { BarChart } from "../components/dashboard/chart";

export default function PersistentDrawerRight() {
  const userName = useState("");
  const userUniveristy = useState("");
  const userWorkPlace = useState("");
  const studentGPA = useState("");

  useEffect(() => {
    // fetch all data related to the specific user info
    console.log("dashboard information");
  }, []);

  return (
    <>
      <Box marginLeft={2} marginTop={13} sx={{ backgroundColor: "#EFF5F5" }}>
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
            display="flex"
            flexDirection="row"
            justifyContent="center"
            sx={{ backgroundColor: "#D6E4E5", borderRadius: 2 }}
          >
            <Typography p={1} color={"black"} variant="h5" fontWeight="600">
              تركي محمد القحطاني
            </Typography>
            <Typography p={1} color={"black"} variant="h5" fontWeight="600">
              تركي محمد القحطاني
            </Typography>
            <Typography p={1} color={"black"} variant="h5" fontWeight="600">
              تركي محمد القحطاني
            </Typography>
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
          </Box>

          {/* ROW 2 */}
          <Box
            component="div"
            gridColumn="span 5"
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
              <Typography color={"black"} variant="h5" fontWeight="600">
                قائمة الشركات
              </Typography>
            </Box>
          </Box>
          <Box
            component="div"
            gridColumn="span 4"
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
              <Typography color={"black"} variant="h5" fontWeight="600">
                حالات الطلب
              </Typography>
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
