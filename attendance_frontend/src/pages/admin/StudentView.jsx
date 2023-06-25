import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
// import Table from "../../components/Table";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ModalForm from "./../../components/ModalForm";
import DisplayTable from "./../../components/DisplayTable";
import TextField from "@mui/material/TextField";
import useAdd from "../../context/add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StudentView = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [loading, setLoading] = useState(true);
  let [student, setStudent] = useState([]);
  let [isEmailError, setIsEmailError] = useState(false);
  let [isPasswordError, setIsPasswordError] = useState(false);
  let [isNameError, setIsNameError] = useState(false);
  let [emailErrors, setEmailErrors] = useState([]);
  let [passwordErrors, setPasswordErrors] = useState([]);
  let [nameErrors, setNameErrors] = useState([]);
  const [open, setOpen] = React.useState(false);

  let [add] = useAdd({
    url: "http://localhost:8000/admin/student",
  });

  let user = useAuth();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function fetchStudent() {
    let headersList = {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let response = await fetch("http://localhost:8000/admin/student", {
      method: "GET",
      headers: headersList,
    });

    let data = await response.json();
    console.log(data);

    setStudent(data.result);
  }

  useEffect(() => {
    fetchStudent();
  }, []);

  const checks = {
    email: ["required"],
    password: ["required"],
    name: ["required"],
  };

  async function handleChange(e) {
    if (e.target.name === "email") {
      handleEmailChange(e);
    } else if (e.target.name === "password") {
      handlePasswordChange(e);
    } else if (e.target.name === "name") {
      handleNameChange(e);
    }
  }

  function handleNameChange(e) {
    setName(e.target.value);
    let errors = [];

    checks.password.forEach((v) => {
      if (v === "required") {
        if (e.target.value === "") {
          errors.push("name is required");
        }
      }
    });
    if (errors.length === 0) {
      setIsNameError(false);
    } else {
      setIsNameError(true);
    }
    setNameErrors(errors);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
    let errors = [];

    checks.password.forEach((v) => {
      if (v === "required") {
        if (e.target.value === "") {
          errors.push("password is required");
        }
      }
    });
    if (errors.length === 0) {
      setIsPasswordError(false);
    } else {
      setIsPasswordError(true);
    }
    setPasswordErrors(errors);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    let errors = [];

    checks.email.forEach((v) => {
      if (v === "required") {
        if (e.target.value === "") {
          errors.push("email is required");
        }
      }
    });
    if (errors.length !== 0) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }
    setEmailErrors(errors);
  }

  async function handleSubmit() {
    if (email === "" || password === "" || name === "") {
      console.log(emailErrors);
      if (email === "" && !emailErrors.includes("email is required")) {
        setIsEmailError(true);
        setEmailErrors([...emailErrors, "email is required"]);
      }
      if (password === "" && !passwordErrors.includes("password is required")) {
        setIsPasswordError(true);
        setPasswordErrors([...passwordErrors, "password is required"]);
      }
      if (name === "" && !nameErrors.includes("name is required")) {
        setIsEmailError(true);
        setEmailErrors([...passwordErrors, "name is required"]);
      }
      return;
    }
    if (
      emailErrors.length !== 0 ||
      passwordErrors.length !== 0 ||
      nameErrors.length !== 0
    ) {
      console.log("cannot call error is there");
      return;
    }
    console.log("submitted", name, email, password);
    let ans = add({ name, email, password });
    console.log(ans);
  }

  return (
    <div>
      <Button onClick={handleOpen}>add</Button>
      <ModalForm
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      >
        <TextField
          error={isNameError ? true : false}
          style={{ marginTop: "20px" }}
          onChange={handleChange}
          value={name}
          id="standard-basic"
          label="name*"
          variant="standard"
          fullWidth={true}
          name="name"
        />
        {nameErrors.length !== 0 &&
          nameErrors.map((v, i) => {
            return (
              <div style={{ color: "red", marginTop: "5px" }} key={i}>
                {" "}
                {v}{" "}
              </div>
            );
          })}
        <TextField
          error={isEmailError ? true : false}
          style={{ marginTop: "20px" }}
          onChange={handleChange}
          value={email}
          id="standard-basic"
          label="email*"
          variant="standard"
          fullWidth={true}
          name="email"
        />
        {emailErrors.length !== 0 &&
          emailErrors.map((v, i) => {
            return (
              <div style={{ color: "red", marginTop: "5px" }} key={i}>
                {" "}
                {v}{" "}
              </div>
            );
          })}
        <TextField
          error={isPasswordError ? true : false}
          onChange={handleChange}
          value={password}
          type="password"
          id="standard-basic"
          label="password*"
          variant="standard"
          fullWidth
          name="password"
          style={{ marginTop: "20px" }}
        />
        {passwordErrors.length !== 0 &&
          passwordErrors.map((v, i) => {
            return (
              <div style={{ color: "red", marginTop: "5px" }} key={i}>
                {" "}
                {v}{" "}
              </div>
            );
          })}
      </ModalForm>

      <DisplayTable
        columns={["name", "email", "action"]}
        rows={student}
      ></DisplayTable>
    </div>
  );
};

export default StudentView;
