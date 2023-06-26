import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import "../../css/linear-gradient.css";
import { useAuth } from "../../context/auth";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const BatchView = () => {
  let [batch, setBatch] = useState([]);
  let [noBatches, setNoBatches] = useState(0);
  let user = useAuth();
  const navigate = useNavigate();

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
    if (data.success) {
      setNoBatches(data.result.length);
    }
    console.log(data);

    setBatch(data.result);
  }

  useEffect(() => {
    fetchBatch();
  }, []);

  function handleBatchClick(e, id) {
    navigate(`/admin/batch/${id}`);
  }

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Button
            variant="outlined"
            sx={{ boxShadow: 6 }}
            startIcon={<AddIcon />}
          >
            Add{" "}
          </Button>
          {batch?.map((v, i) => {
            return (
              <Card
                key={i}
                elevation={6}
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  padding: "20px",
                }}
              >
                <CardContent>
                  <Grid container>
                    <Grid
                      item
                      xs={6}
                      onClick={(e) => handleBatchClick(e, v._id)}
                    >
                      <Stack direction="row" spacing={3}>
                        <Typography gutterBottom variant="h5" color={"primary"}>
                          Course:{v.course}
                        </Typography>
                        <Typography
                          variant="body2"
                          color={"primary"}
                          sx={{ paddingTop: "8px" }}
                        >
                          name of batch: {v.name}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={(e) => console.log(e, row._id)}
                        sx={{ marginRight: "6px" }}
                        startIcon={<EditIcon></EditIcon>}
                      >
                        Edit
                      </Button>

                      <Button
                        onClick={(e) => console.log(e, row._id)}
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon></DeleteIcon>}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
        <Grid item xs={4}>
          <Stack sx={{ marginTop: "50px" }}>
            <Card elevation={6}>
              <Stack direction={"column"}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Total Batch
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {noBatches}
                  </Typography>
                </CardContent>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* <Stack sx={{ marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Stack> */}
      {/* {batch.map((v, i) => {
        return (
          <Stack spacing={2} direction={"row"}>
            <Card>
              <Stack direction={"column"}>
                <CardContent className="blue-gradient">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: "white" }}
                  >
                    {v.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: "white" }}
                  >
                    {v.course}
                  </Typography>
                </CardContent>
              </Stack>
            </Card>
          </Stack> */}
      {/* ); })} */}
    </div>
  );
};

export default BatchView;
