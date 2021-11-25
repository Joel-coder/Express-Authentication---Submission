import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import API from "../../api";
import { useRouter } from "next/router";
//require("typeface-poppins");
//require("typeface-inter");

export default function Survey() {
  const router = useRouter();
  const [arrTable, setArrTable] = useState({});
  useEffect(() => {
    API()
      .get(`/contactInfo/`) // example .get
      .then((response) => {
        if (response.data) {
          console.log("response.data: ", response.data.businessContactsList);
          setArrTable(response.data.businessContactsList);
        }
      });
  }, []);
  let data = Array.from(arrTable);
  console.log("hooks array", data);
  const handleDelete = (id) => {
    console.log(id);
    API()
      .get(`/contactInfo/delete/${id}`) // example .get
      .then((response) => {
        if (response.data) {
          console.log("response.data: ", response.data.businessContactsList);
          setArrTable(response.data.businessContactsList);
        }
      });
  };

  return (
    <>
      <Container maxWidth="lg" className={"form-container"}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={row._id}
                >
                  <TableCell align="right">{row.contact_name}</TableCell>
                  <TableCell align="right">{row.contact_name}</TableCell>
                  <TableCell align="right">{row.contact_name}</TableCell>
                  <TableCell align="right">
                    <button
                      onClick={() => {
                        handleDelete(row._id);
                      }}
                    >
                      delete
                    </button>
                  </TableCell>
                  <TableCell align="right">
                    <button
                      onClick={() => {
                        router.push(`../editSurvey/${row._id}`);
                      }}
                    >
                      edit
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
