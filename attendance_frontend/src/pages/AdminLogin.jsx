import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useNavigate, Route } from "react-router-dom";
import Paper from "@mui/material/Paper";
import MaterialTable from "material-table";
import Table from "./../components/Table";

const AdminLogin = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  useEffect(() => {
    let a = async () => {
      console.log("a");
      if (localStorage.getItem("session")) {
        console.log("hi");
        let result = await fetch(
          "http://localhost:8000/admin/login/authenticate",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("session")}`,
            },
          }
        );
        console.log(await result.json());
        if ((a.success = true)) {
        }
      }
    };
    a();
  }, []);

  async function sentData() {
    console.log("hee");
    const a = await fetch("http://localhost:8000/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        const result = data;
        localStorage.setItem("session", result.result[0].token);
      })
      .catch((err) => console.error(err));
  }

  const paperStyle = {
    padding: "50px",
    width: 280,

    margin: "20px auto",
  };

  return (
    <div>
      <Table></Table>
      <Paper elevation={10} style={paperStyle}>
        <h1 align="center">Login In</h1>
        <br />

        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="standard-basic"
          label="email*"
          variant="standard"
          fullWidth={true}
        />
        <br />
        <br />
        <br />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          id="standard-basic"
          label="password*"
          variant="standard"
          fullWidth
        />
        <br />
        <br />
        <br />

        <Button
          variant="contained"
          fullWidth={true}
          onClick={(event) => sentData(event)}
        >
          Login
        </Button>
        <br />
        <br />
        <br />
      </Paper>

      {/* <Stack direction="column" spacing={2} margin="auto" maxWidth="300px">
        <Box component="div" textAlign="center" fontSize="25px">
          Login Admin
        </Box>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="standard-basic"
          label="email*"
          variant="standard"
        />
        <br />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          id="standard-basic"
          label="password*"
          variant="standard"
        />
        <br />
        <br />
        <Button variant="contained" onClick={(event) => sentData(event)}>
          Login
        </Button>
      </Stack> */}
    </div>
  );
};

export default AdminLogin;
