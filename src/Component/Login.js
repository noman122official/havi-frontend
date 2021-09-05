import React, { useState, useMemo } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import cookies from "js-cookie";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import config from "../config";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/noman122official">
        Naman Das
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    // width:'60vw',
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // padding: '50px 50px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const paperStyle = {
    padding: 30,
    margin: "10vh auto",
    borderRadius: "10px",
    backgroundColor: "#F2F7F7",
  };
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useMemo(() => {
    if (cookies.get("token")) {
      history.push({
        pathname: "/listform",
      });
    }
  }, []);

  function handleUserName(e) {
    setUserName(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") {
        handleSubmit();
    }
  }
  
  function handleSubmit() {
    const loginData = {
      email: userName,
      password: password,
    };
    axios
      .post(`${config.baseUrl}/login`, loginData)
      .then((data) => {
        setErrorMessage(null);
        cookies.set("token", data.data.token);
        cookies.set("fullname", data.data.name);
        history.push({
          pathname: "/listform",
        });
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }
  return (
    <div
      style={{ backgroundColor: "#DCDCDC", height: "100vh", marginTop: "0" }}
    >
      <Header></Header>
      <paper elevation={10}>
        <Container component="main" maxWidth="xs" style={paperStyle}>
          <CssBaseline />
          <div className={classes.paper}>
            {errorMessage && (
              <Alert severity="error">Failed to logged in</Alert>
            )}
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <div className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                placeholder="e-Mail"
                name="email"
                autoComplete="email"
                autoFocus
                value={userName}
                onChange={handleUserName}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
                onKeyDown={handleKeyDown}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </div>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </paper>
    </div>
  );
}
