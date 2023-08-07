import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Employee() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/getemployee")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("errer");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handledelete = (id) => {
    axios
      .delete("http://localhost:8081/delete/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("errer");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/create" className="btn btn-outline-primary">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Gmail</th>
              <th>Salary</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>
                    {
                      <img
                        src={"http://localhost:8081/images/" + employee.image}
                        alt=""
                        className="employee-image"
                      />
                    }
                  </td>
                  <td>{employee.gmail}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.address}</td>
                  <td>
                    <Link
                      to={"/EmployeeEdit/" + employee.id}
                      className="btn btn-outline-warning"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handledelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
