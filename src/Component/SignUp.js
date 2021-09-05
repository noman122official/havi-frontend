import React, { useState, useMemo } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { useHistory } from 'react-router-dom'
import Box from "@material-ui/core/Box";
import cookies from "js-cookie";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import Header from "./Header";
import config from "../config";

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://github.com/noman122official">
              Naman Das
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
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
  select: {
    border: "1px solid #ced4da",
    height: "50px",
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [gender, setGender] = useState("none");
  useMemo(() => {
    if (cookies.get("token")) {
      history.push({
        pathname: "/listform",
      });
    }
  }, []);
  const paperStyle = {
    padding: 30,
    margin: "10vh auto",
    borderRadius: "10px",
    backgroundColor: "#F2F7F7",
  };
  function handleDob(e) {
    setDob(e.target.value);
  }
  function handleFullName(e) {
    console.log(e.target.value);
    setFullName(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handlePassword2(e) {
    setPassword2(e.target.value);
  }
  function handlePhoneNumber(e) {
    setPhoneNumber(e.target.value);
  }
  function handleGender(e) {
    setGender(e.target.value);
  }

  function handleSubmit() {
    if (password !== password2) {
      setErrorMessage("Password does not match");
    } else {
      setErrorMessage(null);
      // console.log(fullname,gender,dob,password,phoneNumber,email)
      const userData = {
        fullname: fullname,
        gender: gender,
        phoneNumber: phoneNumber,
        dob: dob,
        email: email,
        password: password,
      };
      axios
        .post(`${config.baseUrl}/register`, userData)
        .then(function (data) {
          setSuccessMessage("Registration successful");
          setFullName("");
          setDob("");
          setPhoneNumber("");
          setEmail("");
          setPassword("");
          setPassword2("");
          setGender("none");
        })
        .catch(function (error) {
          console.log(error.response);
          const statusCode = error?.response?.status;
          if (statusCode === 400) {
            setErrorMessage(
              error?.response?.data?.error || "Something went wrong"
            );
          } else {
            setErrorMessage("Something went wrong");
          }
        });
    }
  }

  const isDisabled = () => {
    return (
      email.length === 0 ||
      fullname.length === 0 ||
      password.length === 0 ||
      password2.length === 0 ||
      dob.length === 0 ||
      phoneNumber.length === 0 ||
      gender.length === 0
    );
  };

  return (
    <div
      style={{ backgroundColor: "#DCDCDC", height: "150vh", marginTop: "0" }}
    >
      <Header></Header>
      <paper elevation={10}>
        <Container component="main" maxWidth="xs" style={paperStyle}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              placeholder="Enter your Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={fullname}
              onChange={handleFullName}
            />
            <div className={classes.margin} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                placeholder="Email"
                name="email"
                autoComplete="email"
                value={email}
                autoFocus
                onChange={handleEmail}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                placeholder="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                value={phoneNumber}
                autoFocus
                onChange={handlePhoneNumber}
              />
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={gender}
                onChange={handleGender}
                style={{ width: "100%" }}
                className={classes.select}
              >
                <MenuItem value="none" alignItems="flex-start">
                  Select the gender
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>

              <TextField
                id="date"
                label="Birthday"
                type="date"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                defaultValue="1998-09-27"
                InputLabelProps={{
                  shrink: true,
                }}
                value={dob}
                onChange={handleDob}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Enter Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                placeholder="Enter Password again"
                type="password"
                id="password2"
                autoComplete="current-password"
                value={password2}
                onChange={handlePassword2}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isDisabled()}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              {successMessage && (
                <Alert severity="success">{successMessage}</Alert>
              )}
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
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
