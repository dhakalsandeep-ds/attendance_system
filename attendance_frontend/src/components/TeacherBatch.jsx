import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import useAdd from "../context/add";

import Typography from "@mui/material/Typography";
import StudentTeacherBatch from "./StudentTeacherBatch";
import { useAuth } from "../context/auth";
import DisplayTable from "./DisplayTable";
import ModalForm from "./ModalForm";

const TeacherBatch = () => {
  const navigate = useNavigate();
  const { batchId } = useParams();

  let [teachers, setTeachers] = useState([]);
  let [teacher, setTeacher] = useState("");
  const [open, setOpen] = React.useState(false);
  let [batchTeacher, setBatchTeacher] = useState([]);

  const user = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function add(body) {
    let headersList = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let bodyContent = JSON.stringify({ ok: "ok" });

    let response = await fetch(
      "http://localhost:8000/admin/teacher/" + teacher + "/" + batchId,
      {
        method: "put",

        headers: headersList,
      }
    );

    let data = await response.json();
    console.log(data);
  }

  const handleChange = (event) => {
    setTeacher(event.target.value);
  };

  async function fetchTeacher() {
    let headersList = {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let response = await fetch("http://localhost:8000/admin/teacher/", {
      method: "GET",
      headers: headersList,
    });

    let data = await response.json();
    console.log(data);

    setTeachers(data.result);
  }

  useEffect(() => {
    fetchTeacher();
  }, []);
  async function fetchBatchTeacher() {
    let headersList = {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let response = await fetch(
      "http://localhost:8000/admin/teacher/batch/" + batchId,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    console.log(data);

    setBatchTeacher(data.result);
  }

  useEffect(() => {
    fetchBatchTeacher();
  }, []);

  function assignTeacher(e) {
    console.log(e);
    console.log(teacher);
    add();
  }
  console.log("batch Teacher", batchTeacher);

  return (
    <div>
      <Paper elevation={10}>
        <Button onClick={(e) => handleOpen()}>Assign Teacher</Button>
        <Typography variant="h5" gutterBottom>
          {" "}
          Batch Teacher
        </Typography>
        <DisplayTable
          columns={["name", "email", "action"]}
          rows={batchTeacher}
        ></DisplayTable>
      </Paper>

      <ModalForm
        open={open}
        handleClose={handleClose}
        handleSubmit={assignTeacher}
      >
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          fullWidth={true}
        >
          <InputLabel id="demo-simple-select-standard-label">
            teacher
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={teacher}
            onChange={handleChange}
            label="Assign Teacher"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {teachers?.map((v, i) => {
              return (
                <MenuItem value={v._id}>
                  {v.name} - {v.email}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </ModalForm>
    </div>
  );
};

export default TeacherBatch;
