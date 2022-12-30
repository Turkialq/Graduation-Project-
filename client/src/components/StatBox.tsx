import { Box, Typography } from "@mui/material";

const StatBox = ({ title, subtitle, icon, progress, increase }: any) => {
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#6E85B2" }}>
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: "#6E85B2" }}>
          {subtitle}
        </Typography>
        <Typography variant="h5" fontStyle="italic" sx={{ color: "#6E85B2" }}>
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
