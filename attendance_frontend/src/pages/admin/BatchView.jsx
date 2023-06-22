import React, { useEffect, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import Table from "../../components/Table";
import { useAuth } from "../../context/auth";
import { Navigate, useNavigate } from "react-router-dom";

const BatchView = () => {
  let [loading, setLoading] = useState(true);
  let [batches, setBatches] = useState([]);
  let navigate = useNavigate();
  let user = useAuth();

  async function fetchBatch() {
    let headersList = {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let response = await fetch("http://localhost:8000/admin/batch", {
      method: "GET",
      headers: headersList,
    });

    let data = await response.json();
    console.log(data);

    setBatches(data.result);
    setLoading(false);
  }

  function handleClick(id) {
    console.log("clicked");
    navigate(`/admin/batch/${id}`);
  }

  useEffect(() => {
    fetchBatch();
  }, []);
  return (
    <div>
      BatchView
      {batches &&
        batches.map((v, i) => {
          return (
            <button key={i} onClick={(e) => handleClick(v._id, e)}>
              {v.name} {v.course}
            </button>
          );
        })}
    </div>
  );
};

export default BatchView;
