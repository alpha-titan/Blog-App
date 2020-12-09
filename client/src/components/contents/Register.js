import React, { useState } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
const Register = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    fetch("http://localhost:4000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          M.toast({ html: data.message });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mycard">
      <div className="card auth-card">
        <span className="card-title st-style">Register</span>
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
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label
          style={{
            fontSize: "1.4rem",
            color: "black",
            fontFamily: "'Pangolin', cursive",
          }}
        >
          firstName
        </label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <label
          style={{
            fontSize: "1.4rem",
            color: "black",
            fontFamily: "'Pangolin', cursive",
          }}
        >
          LastName
        </label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <label
          style={{
            fontSize: "1.4rem",
            color: "black",
            fontFamily: "'Pangolin', cursive",
          }}
        >
          Email
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn waves-effect waves-light button-style #43a047 green darken-1"
          onClick={() => postData()}
        >
          Submit
        </button>
        <div style={{ textAlign: "center" }}>
          <Link
            style={{ color: "black", fontFamily: "Pangolin , cursive" }}
            to="/login"
          >
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
