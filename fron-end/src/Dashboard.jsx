import axios from "axios";
import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:8081/dashboard").then((res) => {
      if (res.data.Status === "Success") {
      }
    });
  }, []);

  const Deleteclick = () => {
    axios
      .get("http://localhost:8081/deleteclick")
      .then((res) => {
        navigate("/start");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Admin Dashboard</span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <Link to="/home" className="nav-link align-middle px-0">
                  <i className="bi bi-speedometer"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>

              <li>
                <Link to="/employee" className="nav-link px-0 align-middle">
                  <i className="bi bi-people-fill"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">
                    Manage Employee
                  </span>
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link px-0 align-middle">
                  <i className="bi bi-box-arrow-left"></i>{" "}
                  <span
                    className="ms-1 d-none d-sm-inline"
                    onClick={Deleteclick}
                  >
                    Logout
                  </span>{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Employee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
