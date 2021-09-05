import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Header from "./Header";
import cookies from "js-cookie";
import axios from "axios";
import config from "../config";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "70vw",
    },
  },
  table: {
    // width:'70vw'
  },
  tableContainer: {
    margin: "auto auto",
    width: "70vw",
  },
  tableHead: {
    // backgroundColor:'grey'
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    // width:'70vw'
  },
  body: {
    fontSize: 14,
    //   width:'70vw'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    //   width:'70vw'
  },
}))(TableRow);

function Todo(props) {
  const [rows, setRows] = useState([]);
  const [formValue, setFormValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  useMemo(() => {
    if (!cookies.get("token")) {
      history.push({
        pathname: "/login",
      });
    } else {
      axios
        .get(`${config.baseUrl}/task`, {
          headers: {
            token: cookies.get("token"),
          },
        })
        .then((data) => {
          setRows(data.data);
        })
        .catch((error) => {
          setErrorMessage("Something went wrong");
        });
    }
  }, [history]);

  function handleFormValue(event) {
    setFormValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
        handleFormSubmit();
    }
  }

  function handleFormSubmit() {
    const taskData = {
      name: formValue,
    };
    axios
      .post(`${config.baseUrl}/task`, taskData, {
        headers: {
          token: cookies.get("token"),
        },
      })
      .then((data) => {
        setRows([...rows, data.data]);
        setFormValue("");
      })
      .catch((error) => {
        setErrorMessage("Something went wrong");
      });
  }

  function handleFormCancel(e) {
    setFormValue("");
  }

  const classes = useStyles();
  return (
    <div>
      <Header
        val="Logout"
        secondButton={{ value: "User List", path: "/userlist" }}
      ></Header>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <br></br>
      <br></br>
      <div className={classes.root} noValidate autoComplete="off">
        <TextField
          id="filled-basic"
          label="Enter List Item.. "
          variant="filled"
          value={formValue}
          onChange={handleFormValue}
          onKeyDown={handleKeyDown}
        />
        <br></br>
        <Button
          variant="contained"
          color="primary"
          style={{ width: "80px", marginRight: "5px" }}
          onClick={handleFormSubmit}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ width: "80px" }}
          onClick={handleFormCancel}
        >
          Clear
        </Button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <TableContainer
        component={Paper}
        className={classes.tableContainer}
        style={{ marginBottom: "20px" }}
      >
        <Table className={classes.table} aria-label="customized table">
          <TableHead style={{ backgroundColor: "grey", color: "white" }}>
            <TableRow>
              <StyledTableCell>List Item</StyledTableCell>
              <StyledTableCell
                align="right"
                style={{ marginRight: "5px", marginLeft: "auto" }}
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.index}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>

                <StyledTableCell align="right" />
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Todo;
