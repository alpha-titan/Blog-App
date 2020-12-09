import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  const handleSubmit = () => {
    fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          M.toast({ html: data.message });
          dispatch({ type: "USER", payload: data.user });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mycard">
      <div className="card auth-card">
        <span className="card-title st-style">Login</span>
        <label
          style={{
            fontSize: "1.4rem",
            color: "black",
            fontFamily: "'Pangolin', cursive",
          }}
        >
          Username
        </label>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label
          style={{
            fontSize: "1.4rem",
            color: "black",
            fontFamily: "'Pangolin', cursive",
          }}
        >
          Password
        </label>
        <input
          required
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn waves-effect waves-light button-style #43a047 green darken-1"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
        <div style={{ textAlign: "center" }}>
          <Link
            style={{ color: "black", fontFamily: "Pangolin , cursive" }}
            to="/register"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
