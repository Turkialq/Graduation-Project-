import { Box, Container, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function TaskPreview() {
  const { path } = useParams();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            backgroundColor: "#D6E4E5",
            borderRadius: 2,
          }}
        >
          {path?.endsWith(".jpeg") && (
            <Box
              component={"img"}
              sx={{
                height: "100%",
                width: "100%",
                marginTop: 1,
                marginLeft: 1,
                padding: 0.4,
                borderRadius: 3,
              }}
              src={`https://localhost:8080/uploads/${path}`}
              alt="img display"
            ></Box>
          )}
          {path?.endsWith(".pdf") && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
              <Viewer
                fileUrl={`https://localhost:8080/uploads/${path}`}
                plugins={[defaultLayoutPluginInstance]}
              ></Viewer>
            </Worker>
          )}
        </Paper>
      </Container>
    </>
  );
}
