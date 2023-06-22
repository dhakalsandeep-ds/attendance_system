import { Paper } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const AddTeacherAndAdmin = () => {
  const { batchId } = useParams();

  return (
    <div>
      <Paper variant="outlined" square>
        Add Teacher
      </Paper>
      <Paper variant="outlined" square>
        Add Student
      </Paper>
    </div>
  );
};

export default AddTeacherAndAdmin;
