import React, { useEffect, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import Table from "../components/Table";
import { useAuth } from "../context/auth";

const BatchView = () => {
  let [loading, setLoading] = useState(true);
  let [batches, setBatches] = useState([]);
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

  useEffect(() => {
    fetchBatch();
  }, []);
  return (
    <div>
      BatchView
      {loading && <p>loading.......</p>}
      {loading === false && <Table> </Table>}
    </div>
  );
};

export default BatchView;
