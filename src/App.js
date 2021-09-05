import logo from "./logo.svg";
import "./App.css";
import Todo from "./Component/Todo";
import UserInfo from "./Component/UserInfo";
import Login from "./Component/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./Component/SignUp";
import { useMemo, useEffect } from "react";
import cookies from "js-cookie";
import { useHistory } from "react-router";

function App() {
  // const history = useHistory();
  // useEffect(()=>{
  //   if(cookies.get('token')){
  //     history.push({
  //       pathname: '/listform'
  //     })
  //   }else{
  //     history.push({
  //       pathname : '/login'
  //     })
  //   }
  // },[])

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
            <Route path="/listform">
              <Todo></Todo>
            </Route>
            <Route path="/userlist">
              <UserInfo></UserInfo>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/signup">
              <SignUp></SignUp>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
