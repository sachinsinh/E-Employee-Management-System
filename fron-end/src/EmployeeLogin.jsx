import React from "react";
import { useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

function EmployeeLogin() {
  const [values, setValues] = useState({
    gmail: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  axios.defaults.withCredentials = true;

  const HandleClick = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/empolyeelogin", values)
      .then((res) => {
        if (res.data.status === "sucess") {
          navigate("/EmployeeDetail");
          console.log(res);
          localStorage.setItem("users", JSON.stringify(values));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="background-image">
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="p-3 rounded w-25 border loginForm">
          <div className="text-danger">{error && error}</div>
          <center>
            <h2>Employee Login</h2>
          </center>
          <form onSubmit={HandleClick}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                className="form-control rounded-0"
                autoComplete="off"
                onChange={(e) =>
                  setValues({ ...values, gmail: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control rounded-0"
                autoComplete="off"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-light w-100 rounded-0"
            >
              {" "}
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EmployeeLogin;
