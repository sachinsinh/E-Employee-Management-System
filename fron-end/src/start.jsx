import React from "react";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div className="background-image">
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="p-3 rounded w-25 border loginForm text-center">
          <h2>Login As</h2>
          <div className="d-flex justify-content-between mt-5">
            <Link to="/EmployeeLogin" className="btn btn-info btn-lg">
              Employee
            </Link>
            <Link to="/Login" className="btn btn-light btn-lg">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
