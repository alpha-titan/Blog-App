import React, { useState } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          M.toast({ html: data.message });
          history.push("/");
        }
      });
  };

  return (
    <div className="mycard">
      <div className="card auth-card">
        <span className="card-title st-style">Create Post</span>
        <label
          style={{
            fontSize: "1.4rem",
            color: "black",
            fontFamily: "'Pangolin', cursive",
          }}
        >
          title
        </label>
        <input
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label
          style={{
            fontSize: "1.4rem",
            color: "black",
            fontFamily: "'Pangolin', cursive",
          }}
        >
          description
        </label>
        <input
          required
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="btn waves-effect waves-light button-style #43a047 green darken-1"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
