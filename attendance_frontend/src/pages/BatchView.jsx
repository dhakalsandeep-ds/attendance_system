import React, { useEffect, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import Table from "../components/Table";

const BatchView = () => {
  let [loading, setLoading] = useState(false);
  let [batches, setBatches] = useState([]);
  console.log(loading, "loading...........");
  async function fetchBatch() {
    let res = await fetch("http://localhost:8000/admin/batch");
    let result = await res.json();
    console.log(result);
    setBatches(result.result);
    setLoading(!loading);
  }
  useEffect(() => {
    fetchBatch();
  }, []);
  return (
    <div>
      BatchView
      {loading && <p>loading.......</p>}
      {loading == false && <Table> </Table>}
    </div>
  );
};

export default BatchView;
