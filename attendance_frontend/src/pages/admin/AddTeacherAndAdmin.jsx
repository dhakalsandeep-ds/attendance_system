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
import ModalForm from "./../../components/ModalForm";
import DisplayTable from "../../components/DisplayTable";
import Typography from "@mui/material/Typography";
import StudentTeacherBatch from "./../../components/StudentTeacherBatch";

const AddTeacherAndAdmin = () => {
  const navigate = useNavigate();
  const { batchId } = useParams();

  function goBack(e) {
    navigate(-1);
  }

  return (
    <div>
      {/* <Button onClick={(e) => goBack(e)}>go back</Button> */}

      <StudentTeacherBatch></StudentTeacherBatch>
    </div>
  );
};

export default AddTeacherAndAdmin;
