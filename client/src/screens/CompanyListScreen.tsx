import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";

type companyList = {
  field: string;
  id: number;
  location: string;
  name: string;
  type: string;
};

export default function CompanyListScreen() {
  const [companyList, setCompanyList] = useState([{} as companyList]);

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

  const getCompanyList = async () => {
    const acessToken = JSON.parse(localStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url = "http://localhost:8080/company/get-company-list/";
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
        console.log(error);
      });
  };

  useEffect(() => {
    getCompanyList();
  }, []);

  return (
    <Box
      component={"div"}
      sx={{
        height: 750,
        width: "81%",
        marginTop: 8,

        backgroundColor: "#EFF5F5",
      }}
    >
      <DataGrid
        onRowClick={(e: any) => {
          console.log(e.row.name);
        }}
        pageSize={12}
        columns={colums}
        rows={companyList}
        getRowId={(row) => row.id + 1}
        sx={{ fontSize: 20, margin: 2 }}
      />
    </Box>
  );
}
