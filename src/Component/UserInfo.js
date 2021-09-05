import React, { useMemo, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Header from "./Header";
import config from "../config";
import cookies, { set } from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router";
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

function UserInfo(props) {
  const [rows, setRows] = useState([]);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(null);
  useMemo(() => {
    if (!cookies.get("token")) {
      history.push({
        pathname: "/login",
      });
    } else {
      axios
        .get(`${config.baseUrl}/admin/users`, {
          headers: {
            token: cookies.get("token"),
          },
        })
        .then((data) => {
          console.log(data);
          setRows(data.data);
        })
        .catch((error) => {
          const statusCode = error?.response?.status;
          if (statusCode === 401) {
            setErrorMessage("You are not authorised to view this page");
          } else {
            setErrorMessage("Something went wrong");
          }
        });
    }
  }, []);

  const classes = useStyles();
  return (
    <>
      {errorMessage ? (
        <>
          <Header val="Logout" secondButton={{'value' : 'Home' , 'path' : '/listform'}}></Header>
          <Alert severity="error">{errorMessage}</Alert>
        </>
      ) : (
        <div>
          <Header val="Logout" secondButton={{'value' : 'Home' , 'path' : '/listform'}}></Header>
          <br></br>
          <TableContainer
            component={Paper}
            className={classes.tableContainer}
            style={{ marginBottom: "20px" }}
          >
            <Table className={classes.table} aria-label="customized table">
              <TableHead style={{ backgroundColor: "grey", color: "white" }}>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Gender</StyledTableCell>
                  <StyledTableCell>D.O.B</StyledTableCell>

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
                      {row?.fullname || ""}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row?.email || ""}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row?.gender || ""}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row?.dob}
                    </StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}

export default UserInfo;
