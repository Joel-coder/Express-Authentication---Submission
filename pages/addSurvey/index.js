import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import API from "../../api";
//require("typeface-poppins");
//require("typeface-inter");

export default function AddSurvey() {
  const [arrTable, setArrTable] = useState({});
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    const accountData = {
      contact_name: name,
      contact_number: number,
      email: email,
    };
    API()
      .post(`contactInfo/add`, accountData) // example .get
      .then((response) => {
        if (response.data) {
          console.log("success ");
        }
      });
  };

  return (
    <>
      <Container maxWidth="sm" className={"form-container"}>
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          name="contact_name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="Phone"
          variant="standard"
          name="contact_number"
          onChange={(event) => {
            setNumber(event.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="email"
          variant="standard"
          name="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Button type="button" variant="text" onClick={handleSubmit}>
          Submit
        </Button>
      </Container>
    </>
  );
}
