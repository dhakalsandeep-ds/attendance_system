import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useParams } from "react-router-dom";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Toastify from "./Toastify";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

const PreviousAttendanceAll = () => {
  let [batchReport, setBatchReport] = useState([]);
  let [toastMessage, setToastMessage] = useState();
  let [severity, setSeverity] = useState();
  let [openToast, setOpenToast] = useState(false);
  let [dat, setDat] = useState();
  let [columns, setColumns] = useState([]);
  let [studentRep, setStudentRep] = useState([]);
  let [data, setData] = useState([]);
  let [inputYear, setInputYear] = useState([
    new Date().toISOString().split("-")[0],
  ]);
  let [valueYear, setValueYear] = useState([
    new Date().toISOString().split("-")[0],
  ]);
  let [inputMonth, setInputMonth] = useState([
    new Date().toISOString().split("-")[1],
  ]);
  let [valueMonth, setValueMonth] = useState([
    new Date().toISOString().split("-")[1],
  ]);

  const [inputValue, setInputValue] = React.useState(
    new Date().toISOString().split("-")[1]
  );

  const handleOpenToast = () => {
    setOpenToast(true);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  let { batchId } = useParams();
  let user = useAuth();

  async function fetchStudentsReport() {
    let headersList = {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let response = await fetch(
      "http://localhost:8000/attendance/" +
        batchId +
        "/" +
        inputYear +
        "/" +
        inputMonth,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    console.log(data, "insdie get previous student");

    setData(data.result);

    let dates = new Set();

    let nm = new Set();
    console.log("data.........", data);

    data.result.forEach((v, id) => {
      nm.add(v.studentId._id + "-" + v.studentId.name);
      dates.add(v.date);
    });

    let unique = [...dates];
    console.log("nm........", [...nm]);
    console.log("un........", unique);

    let studentsd = {};
    let columns = new Set();
    let names = new Set();
    let res = data.result.map((v) => {
      // let a = {
      //   name: v.name,
      //   status: "P",
      //   studentId: v._id,
      // };
      columns.add(v.date.split("T")[0]);
      names.add(v.studentId.name);
      if (studentsd[v.studentId.name]) {
        studentsd[v.studentId.name].push(
          v.status === 0 ? "p" : v.status === 1 ? "A" : "L"
        );
      } else {
        studentsd[v.studentId.name] = [
          v.status === 0 ? "p" : v.status === 1 ? "A" : "L",
        ];
      }
      // return a;
    });

    console.log(studentsd, "studentsd.................");
    console.log(Object.entries(studentsd), "studentsd.................");
    // console.log(...columns, "date coluns........");

    setColumns(unique);

    // setBatchReport([...names]);
    setStudentRep([...nm]);

    // setBatchReport(studentsd);
  }

  //   async function register() {
  //     let headersList = {
  //       "Content-type": "application/json",
  //       Authorization: `Bearer ${user.token()}`,
  //     };

  //     let bodyContent = JSON.stringify({ data: batchStudent });
  //     let data;
  //     try {
  //       let response = await fetch("http://localhost:8000/attendance/submit/", {
  //         method: "post",
  //         headers: headersList,
  //         body: bodyContent,
  //       });

  //       data = await response.json();
  //     } catch (e) {
  //       setOpenToast(true);
  //       setToastMessage("something went wrong");
  //       setSeverity("error");
  //       handleClose();
  //     }
  //     if (data.success) {
  //       setOpenToast(true);
  //       setToastMessage(data.message);
  //       setSeverity("success");
  //       handleClose();
  //     } else {
  //       setOpenToast(true);
  //       setToastMessage(data.message);
  //       setSeverity("error");
  //       handleClose();
  //     }

  //     console.log(data, "previous attendance");
  //   }

  const getAttendanceStatus = (id, date) => {
    console.log(data, "data......................");
    const attendanceRecord = data.find((item) => {
      console.log(
        item,
        "item...................",
        item.studentId._id,
        id,
        item.date,
        date
      );
      return item.studentId._id === id && item.date === date;
    });

    // if (attendanceRecord) {
    //   return attendanceRecord.isPresent ? 'Present' : 'Absent';
    // }

    console.log("attendanceRecord ................", attendanceRecord);

    if (!attendanceRecord) {
      return "N";
    }

    return attendanceRecord.status;
  };

  useEffect(() => {
    fetchStudentsReport();
  }, []);

  const yrs = function () {
    let dates = [];

    let start = 2010;
    let end = parseInt(new Date().toISOString().split("-")[0]);

    for (let i = start; i <= end; i++) {
      dates.push(i.toString());
    }

    return dates;
  };

  const top100Films = [
    { label: "The sandeep Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
      label: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { label: "The Good, the Bad and the Ugly", year: 1966 },
    { label: "Fight Club", year: 1999 },
    {
      label: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
    },
    {
      label: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
    },
    { label: "Forrest Gump", year: 1994 },
    { label: "Inception", year: 2010 },
    {
      label: "The Lord of the Rings: The Two Towers",
      year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: "Goodfellas", year: 1990 },
    { label: "The Matrix", year: 1999 },
    { label: "Seven Samurai", year: 1954 },
    {
      label: "Star Wars: Episode IV - A New Hope",
      year: 1977,
    },
    { label: "City of God", year: 2002 },
    { label: "Se7en", year: 1995 },
    { label: "The Silence of the Lambs", year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: "Life Is Beautiful", year: 1997 },
    { label: "The Usual Suspects", year: 1995 },
    { label: "Léon: The Professional", year: 1994 },
    { label: "Spirited Away", year: 2001 },
    { label: "Saving Private Ryan", year: 1998 },
    { label: "Once Upon a Time in the West", year: 1968 },
    { label: "American History X", year: 1998 },
    { label: "Interstellar", year: 2014 },
    { label: "Casablanca", year: 1942 },
    { label: "City Lights", year: 1931 },
    { label: "Psycho", year: 1960 },
    { label: "The Green Mile", year: 1999 },
    { label: "The Intouchables", year: 2011 },
    { label: "Modern Times", year: 1936 },
    { label: "Raiders of the Lost Ark", year: 1981 },
    { label: "Rear Window", year: 1954 },
    { label: "The Pianist", year: 2002 },
    { label: "The Departed", year: 2006 },
    { label: "Terminator 2: Judgment Day", year: 1991 },
    { label: "Back to the Future", year: 1985 },
    { label: "Whiplash", year: 2014 },
    { label: "Gladiator", year: 2000 },
    { label: "Memento", year: 2000 },
    { label: "The Prestige", year: 2006 },
    { label: "The Lion King", year: 1994 },
    { label: "Apocalypse Now", year: 1979 },
    { label: "Alien", year: 1979 },
    { label: "Sunset Boulevard", year: 1950 },
    {
      label:
        "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
      year: 1964,
    },
    { label: "The Great Dictator", year: 1940 },
    { label: "Cinema Paradiso", year: 1988 },
    { label: "The Lives of Others", year: 2006 },
    { label: "Grave of the Fireflies", year: 1988 },
    { label: "Paths of Glory", year: 1957 },
    { label: "Django Unchained", year: 2012 },
    { label: "The Shining", year: 1980 },
    { label: "WALL·E", year: 2008 },
    { label: "American Beauty", year: 1999 },
    { label: "The Dark Knight Rises", year: 2012 },
    { label: "Princess Mononoke", year: 1997 },
    { label: "Aliens", year: 1986 },
    { label: "Oldboy", year: 2003 },
    { label: "Once Upon a Time in America", year: 1984 },
    { label: "Witness for the Prosecution", year: 1957 },
    { label: "Das Boot", year: 1981 },
    { label: "Citizen Kane", year: 1941 },
    { label: "North by Northwest", year: 1959 },
    { label: "Vertigo", year: 1958 },
    {
      label: "Star Wars: Episode VI - Return of the Jedi",
      year: 1983,
    },
    { label: "Reservoir Dogs", year: 1992 },
    { label: "Braveheart", year: 1995 },
    { label: "M", year: 1931 },
    { label: "Requiem for a Dream", year: 2000 },
    { label: "Amélie", year: 2001 },
    { label: "A Clockwork Orange", year: 1971 },
    { label: "Like Stars on Earth", year: 2007 },
    { label: "Taxi Driver", year: 1976 },
    { label: "Lawrence of Arabia", year: 1962 },
    { label: "Double Indemnity", year: 1944 },
    {
      label: "Eternal Sunshine of the Spotless Mind",
      year: 2004,
    },
    { label: "Amadeus", year: 1984 },
    { label: "To Kill a Mockingbird", year: 1962 },
    { label: "Toy Story 3", year: 2010 },
    { label: "Logan", year: 2017 },
    { label: "Full Metal Jacket", year: 1987 },
    { label: "Dangal", year: 2016 },
    { label: "The Sting", year: 1973 },
    { label: "2001: A Space Odyssey", year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: "Toy Story", year: 1995 },
    { label: "Bicycle Thieves", year: 1948 },
    { label: "The Kid", year: 1921 },
    { label: "Inglourious Basterds", year: 2009 },
    { label: "Snatch", year: 2000 },
    { label: "3 Idiots", year: 2009 },
    { label: "Monty Python and the Holy Grail", year: 1975 },
  ];

  console.log("inputYear.....", inputYear);
  console.log("inputMonth.....", inputMonth);

  const mon = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const yr = yrs();
  return (
    <div>
      <Stack direction={"row"} spacing={9} sx={{ marginBottom: "15px" }}>
        <Autocomplete
          inputValue={inputYear}
          onInputChange={(event, newInputYear) => {
            setInputYear(newInputYear);
          }}
          id="controllable-states-demo"
          options={yr}
          value={valueYear}
          onChange={(e, nv) => {
            setValueYear(nv);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Month" />}
        />
        <Autocomplete
          inputValue={inputMonth}
          onInputChange={(event, newInputValue) => {
            setInputMonth(newInputValue);
          }}
          id="controllable-states-demo"
          options={mon}
          value={valueMonth}
          onChange={(event, newValue) => {
            setValueMonth(newValue);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Month" />}
          // <Button onClick={()=>fetchStudentsReport()}>fetch</Button>
        />

        <Button
          onClick={() => {
            fetchStudentsReport();
          }}
        >
          fetch{" "}
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ padding: "10px" }} elevation={6}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>name of student</TableCell>

              {columns.map((v, i) => {
                return <TableCell key={i}>{v.split("T")[0]}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {batchReport?.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell
                  onClick={(e) => {
                    if (batchReport[i].status === "A") {
                      batchReport[i].status = "P";
                    } else if (batchReport[i].status === "P") {
                      batchReport[i].status = "L";
                    } else if (batchReport[i].status === "L") {
                      batchReport[i].status = "A";
                    }
                    console.log(batchReport[i].status);

                    setBatchStudent([...batchReport]);
                  }}
                >
                  <Button
                    sx={{
                      color:
                        batchReport[i].status === "A"
                          ? "red"
                          : batchReport[i].status === "P"
                          ? "primary"
                          : "orange",
                    }}
                  >
                    {row.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))} */}
            {studentRep?.map((name, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {name.split("-")[1]}
                </TableCell>

                {columns.map((v, i) => {
                  return (
                    <TableCell component="th" scope="row">
                      {`${getAttendanceStatus(name.split("-")[0], v)}`}
                    </TableCell>
                  );
                })}

                {/* <TableCell
                  onClick={(e) => {
                    if (batchReport[i].status === "A") {
                      batchReport[i].status = "P";
                    } else if (batchReport[i].status === "P") {
                      batchReport[i].status = "L";
                    } else if (batchReport[i].status === "L") {
                      batchReport[i].status = "A";
                    }
                    console.log(batchReport[i].status);

                    setBatchStudent([...batchReport]);
                  }}
                >
                  <Button
                    sx={{
                      color:
                        batchReport[i].status === "A"
                          ? "red"
                          : batchReport[i].status === "P"
                          ? "primary"
                          : "orange",
                    }}
                  >
                    {row.status}
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <Button
          variant="outlined"
          startIcon={<SendIcon></SendIcon>}
          onClick={(e) => register()}
          sx={{ marginTop: "10px" }}
        >
          register
        </Button> */}
      </TableContainer>

      {/* <Toastify
        handleOpen={handleOpenToast}
        handleClose={handleCloseToast}
        message={toastMessage}
        severity={severity}
        open={openToast}
      ></Toastify> */}
    </div>
  );
};

export default PreviousAttendanceAll;
