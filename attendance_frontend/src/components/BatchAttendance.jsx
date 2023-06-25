import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useParams } from "react-router-dom";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const BatchAttendance = () => {
  let [batchStudent, setBatchStudent] = useState([]);

  let { batchId } = useParams();
  let user = useAuth();
  async function fetchBatchStudent() {
    let headersList = {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let response = await fetch(
      "http://localhost:8000/attendance/studentList/" + batchId,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    console.log(data);
    let res = data.result.map((v) => {
      let a = {
        name: v.name,
        status: "P",
        studentId: v._id,
      };
      return a;
    });

    setBatchStudent(res);
  }

  async function register() {
    let headersList = {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let bodyContent = JSON.stringify({ data: batchStudent });

    let response = await fetch(
      "http://localhost:8000/attendance/submit/" + batchId,
      {
        method: "post",
        headers: headersList,
        body: bodyContent,
      }
    );

    let data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    fetchBatchStudent();
  }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {["name", new Date().toLocaleDateString()].map((v, i) => {
                return <TableCell key={i}>{v}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {batchStudent?.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell>
                  <Button
                    onClick={(e) => {
                      if (batchStudent[i].status === "A") {
                        batchStudent[i].status = "P";
                      } else if (batchStudent[i].status === "P") {
                        batchStudent[i].status = "L";
                      } else if (batchStudent[i].status === "L") {
                        batchStudent[i].status = "A";
                      }
                      console.log(batchStudent[i].status);

                      setBatchStudent([...batchStudent]);
                    }}
                  >
                    {row.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={(e) => register()}>register</Button>
      </TableContainer>
    </div>
  );
};

export default BatchAttendance;