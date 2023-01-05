import { Box, Typography } from "@mui/material";

const StatBox = ({ title, icon }: any) => {
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "black", marginLeft: 65 }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;
