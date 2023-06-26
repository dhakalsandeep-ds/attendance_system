import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
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
import Toastify from "./Toastify";
import BatchTable from "./BatchTable";

const StudentBatch = () => {
  const navigate = useNavigate();
  const { batchId } = useParams();

  let [students, setStudents] = useState([]);
  let [student, setStudent] = useState("");
  const [open, setOpen] = React.useState(false);
  let [batchStudent, setBatchStudent] = useState([]);

  let [toastMessage, setToastMessage] = useState();
  let [severity, setSeverity] = useState();
  let [openToast, setOpenToast] = useState(false);

  const handleOpenToast = () => {
    setOpenToast(true);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const user = useAuth();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function add(body) {
    let headersList = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let bodyContent = JSON.stringify({ ok: "ok" });
    let data;
    try {
      let response = await fetch(
        "http://localhost:8000/admin/student/" + student + "/" + batchId,
        {
          method: "put",

          headers: headersList,
        }
      );

      data = await response.json();
    } catch (e) {
      setOpenToast(true);
      setToastMessage("something went wrong");
      setSeverity("error");
      handleClose();
    }
    if (data.success) {
      setOpenToast(true);
      setToastMessage(data.message);
      setSeverity("success");
      handleClose();
    } else {
      setOpenToast(true);
      setToastMessage(data.message);
      setSeverity("error");
      handleClose();
    }
    console.log(data);
  }

  const handleChange = (event) => {
    setStudent(event.target.value);
  };

  async function fetchStudent() {
    let headersList = {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let response = await fetch("http://localhost:8000/admin/student/", {
      method: "GET",
      headers: headersList,
    });

    let data = await response.json();
    console.log(data);

    setStudents(data.result);
  }

  useEffect(() => {
    fetchStudent();
  }, []);
  async function fetchBatchStudent() {
    let headersList = {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let response = await fetch(
      "http://localhost:8000/admin/student/batch/" + batchId,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    console.log(data);

    setBatchStudent(data.result);
  }

  useEffect(() => {
    fetchBatchStudent();
  }, []);

  function assignTeacher(e) {
    console.log(e);
    console.log(student);
    add();
  }
  console.log("batch Teacher", batchStudent);

  return (
    <div>
      <Paper elevation={10} sx={{ padding: "15px" }}>
        <Stack marginBottom={"10px"}>
          <Button
            variant="outlined"
            startIcon={<AddIcon></AddIcon>}
            onClick={(e) => handleOpen()}
            sx={{ width: "fit-content" }}
          >
            Assign Teacher
          </Button>
        </Stack>

        <BatchTable
          columns={["name", "email", "action"]}
          rows={batchStudent}
        ></BatchTable>
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
            student
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={student}
            onChange={handleChange}
            label="Assign Teacher"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {students?.map((v, i) => {
              return (
                <MenuItem value={v._id}>
                  {v.name} - {v.email}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </ModalForm>
      <Toastify
        handleOpen={handleOpenToast}
        handleClose={handleCloseToast}
        message={toastMessage}
        severity={severity}
        open={openToast}
      ></Toastify>
    </div>
  );
};

export default StudentBatch;
