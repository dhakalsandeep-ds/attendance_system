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
import { useAuth } from "../../context/auth";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { assignTeacher } from "../../../../attendance_backend/src/controllers/adminController";

const AddTeacherAndAdmin = () => {
  const navigate = useNavigate();
  const { batchId } = useParams();
  let [teachers, setTeachers] = useState([]);
  let [teacher, setTeacher] = useState("");

  const handleChange = (event) => {
    setTeacher(event.target.value);
  };

  const user = useAuth();
  console.log(batchId);

  function goBack(e) {
    navigate(-1);
  }

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

  function assignTeacher(e) {
    console.log(e);
  }

  return (
    <div>
      <Button onClick={(e) => goBack(e)}>go back</Button>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={teacher}
          onChange={handleChange}
          label="Age"
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
      <Button onClick={(e) => assignTeacher(e)}>Assign Teacher</Button>
    </div>
  );
};

export default AddTeacherAndAdmin;
