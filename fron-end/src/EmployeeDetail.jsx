import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axois from "axios";

function EmployeeDetail() {
  const [values, setValues] = useState([]);
  const navigate = useNavigate();

  axois.defaults.withCredentials = true;
  const deleteclick = () => {
    axois
      .get("http://localhost:8081/deleteclick")
      .then((res) => navigate("/start"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axois
      .get("http://localhost:8081/getemployee")
      .then((res) => {
        if (res.data.Status === "Success") {
          setValues(res.data.Result);
        } else {
          alert("err");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="employee-detail">
      <div className="px-5 py-3">
        <Link
          type="button"
          className="btn btn-outline-primary"
          onClick={deleteclick}
        >
          Back
        </Link>
        <div className="d-flex justify-content-center">
          <h2>
            <b>Employee Detail</b>
          </h2>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="mt-3">
          <table className="table table-bordered border-primary">
            <thead>
              <tr>
                <th>
                  <b>Id</b>
                </th>
                <th>
                  <b>Name</b>
                </th>
                <th>
                  <b>Image</b>
                </th>
                <th>
                  <b>Gmail</b>
                </th>
                <th>
                  <b>Salary</b>
                </th>
                <th>
                  <b>Address</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {values.map((employee, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{employee.name}</td>
                    <td>
                      {
                        <img
                          src={"http://localhost:8081/images/" + employee.image}
                          alt=""
                          className="employee-Image"
                        />
                      }
                    </td>
                    <td>{employee.gmail}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      ;
    </div>
  );
}

export default EmployeeDetail;
