import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import API from "../../../api";
//require("typeface-poppins");
//require("typeface-inter");

export default function EditSurvey() {
  const [arrTable, setArrTable] = useState({});
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [databaseID, setDatabaseID] = useState("");
  const router = useRouter();
  const handleSubmit = () => {
    const accountData = {
      contact_name: name,
      contact_number: number,
      email: email,
    };
  };
  useEffect(() => {
    if (router.query?.id != undefined) {
      getId();
    }
  }, [router.query.id]);

  const getId = async () => {
    let id = router.query.id;
    API()
      .get(`contactInfo/edit/${id}`)
      .then((response) => {
        if (response.data) {
          console.log("response.data: ", response.data);
          setName(response.data.contactInfo.contact_name);
          setNumber(response.data.contactInfo.contact_number);
          setEmail(response.data.contactInfo.email);

          //setArrTable(response.data.businessContactsList);
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
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          multiline
          maxRows={1}
        />
        <TextField
          id="standard-basic"
          label="Phone"
          variant="standard"
          name="contact_number"
          value={number}
          onChange={(event) => {
            setNumber(event.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="email"
          variant="standard"
          name="email"
          value={email}
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
