import React, { useContext, useState, useEffect } from "react";
import M from "materialize-css";
import { UserContext } from "../../contexts/UserContext";
import "./Home.css";
import { useHistory } from "react-router-dom";
const Home = () => {
  const { state } = useContext(UserContext);
  const [data, setData] = useState([]);
  const history = useHistory();
  console.log(typeof data);
  console.log(data);

  const handleClick = (id) => {
    fetch(`http://localhost:4000/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => M.toast({ html: res.message }));
    const newData = data.filter((post) => post._id !== id);
    setData(newData);
  };

  useEffect(() => {
    fetch("http://localhost:4000/posts/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((posts) => {
        setData(posts);
      });
  }, []);

  return (
    <>
      {data.map((post) => {
        return (
          <div key={post._id} className="card">
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
                {post.title}{" "}
                <span style={{ float: "right", fontSize: "1rem" }}>
                  {post.postedBy.username}
                </span>
              </span>
              <p>{post.description}</p>
              {state._id === post.postedBy._id ? (
                <button onClick={() => handleClick(post._id)} className="btn">
                  delete
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Home;
