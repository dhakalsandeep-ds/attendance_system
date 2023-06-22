import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useNavigate, Route, Navigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import MaterialTable from "material-table";
import Table from "../../components/Table";
import useLocalStorage from "../../../../attendance_backend/src/hooks/useLocalStorage";
import { useAuth } from "../../context/auth";

const AdminLogin = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [emailErrors, setEmailErrors] = useState([]);
  let [passwordErrors, setPasswordErrors] = useState([]);
  let [isEmailError, setIsEmailError] = useState(false);
  let [isPasswordError, setIsPasswordError] = useState(false);

  const user = useAuth();

  const checks = {
    email: ["required"],
    password: ["required"],
  };

  async function handleChange(e) {
    if (e.target.name === "email") {
      handleEmailChange(e);
    } else if (e.target.name === "password") {
      handlePasswordChange(e);
    }
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
    if (email === "" || password === "") {
      console.log(emailErrors);
      if (email === "" && !emailErrors.includes("email is required")) {
        setIsEmailError(true);
        setEmailErrors([...emailErrors, "email is required"]);
      }
      if (password === "" && !passwordErrors.includes("password is required")) {
        setIsPasswordError(true);
        setPasswordErrors([...passwordErrors, "password is required"]);
      }
      return;
    }
    if (emailErrors.length !== 0 || passwordErrors.length !== 0) {
      console.log("cannot call error is there");
      return;
    }
    user.login({ email, password });
  }

  const paperStyle = {
    padding: "50px",
    width: 280,

    margin: "20px auto",
  };

  return (
    <div style={{ paddingTop: "77px" }}>
      <Paper elevation={10} style={paperStyle}>
        <h1 align="center">Login In</h1>

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

        <Button
          variant="contained"
          style={{ marginTop: "30px" }}
          fullWidth={true}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Paper>
    </div>
  );
};

export default AdminLogin;
