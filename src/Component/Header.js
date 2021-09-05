import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
    },
    logo: {
      maxWidth: 40,
      marginRight: "10px",
    },
  })
);

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const fullname = cookies.get("fullname");

  function logout() {
    console.log("hellop");
    cookies.remove("token");
    cookies.remove("fullname");
    history.push({
      pathname: "/login",
    });
  }

  function redirectToLocation() {
    history.push({
      pathname: props.secondButton.path,
    });
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {fullname?.toLowerCase()} Empire!
          </Typography>

          {props.secondButton && (
            <Button color="inherit" onClick={redirectToLocation}>
              {props.secondButton.value}
            </Button>
          )}
          <Button color="inherit" onClick={logout}>
            {props.val ? props.val : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
