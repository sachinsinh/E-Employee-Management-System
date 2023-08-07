import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EmployeeEdit() {
  const [data, setData] = useState({
    name: "",
    gmail: "",
    address: "",
    salary: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id)
      .then((res) => {
        setData({
          ...data,
          name: res.data.Result[0].name,

          gmail: res.data.Result[0].gmail,

          address: res.data.Result[0].address,

          salary: res.data.Result[0].salary,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleupdate = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/update/" + id, data)
      .then((res) => {
        console.log(res);
        if (res.data.Status === "Success") {
          navigate("/employee");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-5">
      <h2>Update Employee</h2>

      <form className="row g-3 w-50">
        <div className="col-12">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <label className="form-label">Gmail Address</label>
          <input
            type="gmail"
            className="form-control"
            placeholder="Enter Gmail"
            value={data.gmail}
            onChange={(e) => setData({ ...data, gmail: e.target.value })}
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Address"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <label className="form-label">Salary</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Salary"
            value={data.salary}
            onChange={(e) => setData({ ...data, salary: e.target.value })}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleupdate}
        >
          Update Data
        </button>
      </form>
    </div>
  );
}

export default EmployeeEdit;
