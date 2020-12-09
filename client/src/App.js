import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { useContext, useEffect } from "react";
import "./App.css";
import CreatePost from "./components/contents/CreatePost";
import Home from "./components/contents/Home";
import Login from "./components/contents/Login";
import Register from "./components/contents/Register";
import Navbar from "./components/Navbar";
import UserContextProvider, { UserContext } from "./contexts/UserContext";

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user) {
      history.push("/login");
    } else {
      dispatch({ type: "USER", payload: user });
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
    </Switch>
  );
};

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
