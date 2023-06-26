import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BatchTable({
  columns,
  rows,
  elevation = 0,
  handleUnassign,
}) {
  return (
    <TableContainer
      component={Paper}
      elevation={elevation}
      sx={{ padding: "10px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((v, i) => {
              return <TableCell key={i}>{v}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length !== 0 &&
            rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Button
                    onClick={(e) => handleUnassign(e, row._id)}
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon></DeleteIcon>}
                  >
                    unassign
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell>no data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
