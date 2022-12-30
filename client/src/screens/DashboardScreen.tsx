import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import EmailIcon from "@mui/icons-material/Email";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import StatBox from "../components/StatBox";

export default function PersistentDrawerRight() {
  return (
    <>
      <Box m="20px">
        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(15, 1fr)"
          gridAutoRows="150px"
          gap="15px"
          sx={{ marginTop: 10 }}
        >
          {/* ROW 1 */}
          <Box
            component="div"
            gridColumn="span 3"
            color="#1F2A40"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: "#1F2A40", borderRadius: 2 }}
          >
            <StatBox
              title="6"
              subtitle="Daily Files Uploaded"
              progress="0.75"
              increase="total: 600"
              icon={<EmailIcon sx={{ color: "#6E85B2", fontSize: "26px" }} />}
            />
          </Box>
          <Box
            component="div"
            gridColumn="span 3"
            color="#1F2A40"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: "#1F2A40", borderRadius: 2 }}
          >
            <StatBox
              title="431,225"
              subtitle="Sales Obtained"
              progress="0.50"
              increase="+21%"
              icon={
                <PointOfSaleIcon sx={{ color: "#6E85B2", fontSize: "26px" }} />
              }
            />
          </Box>
          <Box
            component="div"
            gridColumn="span 3"
            color="#1F2A40"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: "#1F2A40", borderRadius: 2 }}
          >
            <StatBox
              title="4"
              subtitle="Total users"
              progress="0.30"
              increase="+5%"
              icon={
                <PersonAddIcon sx={{ color: "#6E85B2", fontSize: "26px" }} />
              }
            />
          </Box>
          <Box
            component="div"
            gridColumn="span 3"
            color="#1F2A40"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: "#1F2A40", borderRadius: 2 }}
          >
            <StatBox
              title="502.2"
              subtitle="Traffic Received"
              progress="0.80"
              icon={<TrafficIcon sx={{ color: "#6E85B2", fontSize: "26px" }} />}
            />
          </Box>

          {/* ROW 2 */}
          <Box
            component="div"
            gridColumn="span 8"
            gridRow="span 2"
            color="#1F2A40"
            overflow="auto"
            sx={{ backgroundColor: "#1F2A40", borderRadius: 2 }}
          >
            <Box
              component="div"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px${"#141b2d"}`}
              color={"#d0d1d5"}
              p="15px"
              sx={{ backgroundColor: "#1F2A40", borderRadius: 2 }}
            >
              <Typography color={"#6E85B2"} variant="h5" fontWeight="600">
                Delete Files
              </Typography>
            </Box>
          </Box>
          <Box
            component="div"
            gridColumn="span 4"
            gridRow="span 2"
            color={"#1F2A40"}
            overflow="auto"
            sx={{ backgroundColor: "#1F2A40", borderRadius: 2 }}
          >
            <Box
              component="div"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px${"#141b2d"}`}
              color={"#d0d1d5"}
              p="15px"
              sx={{ backgroundColor: "#1F2A40", borderRadius: 2 }}
            >
              <Typography color={"#6E85B2"} variant="h5" fontWeight="600">
                Users information
              </Typography>
            </Box>
          </Box>

          {/* ROW 3 */}
          <Box
            component="div"
            gridColumn="span 4"
            gridRow="span 2"
            color={"#1F2A40"}
            p="30px"
            sx={{ backgroundColor: "#1F2A40", borderRadius: 2 }}
          >
            <Typography variant="h5" fontWeight="600">
              Campaign
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
              sx={{ backgroundColor: "#1F2A40", borderRadius: 2 }}
            >
              <Typography variant="h5" color={"#6E85B2"} sx={{ mt: "15px" }}>
                TBC
              </Typography>
              <Typography>
                Includes extra misc expenditures and costs
              </Typography>
            </Box>
          </Box>
          <Box
            component="div"
            gridColumn="span 4"
            gridRow="span 2"
            sx={{ backgroundColor: "#1F2A40", borderRadius: 2 }}
          >
            {/* <AdminChart /> */}
          </Box>
          <Box
            component="div"
            gridColumn="span 4"
            gridRow="span 2"
            padding="30px"
            sx={{ backgroundColor: "#1F2A40", borderRadius: 2 }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px", color: "#6E85B2" }}
            >
              Files Based Storage
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
