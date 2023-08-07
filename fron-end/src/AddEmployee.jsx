import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [data, setData] = useState({
    name: "",
    gmail: "",
    password: "",
    address: "",
    salary: "",
    image: "",
  });
  const navigate = useNavigate();

  const HandleClick = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("gmail", data.gmail);
    formdata.append("password", data.password);
    formdata.append("address", data.address);
    formdata.append("salary", data.salary);
    formdata.append("image", data.image);

    axios
      .post("http://localhost:8081/create", formdata)
      .then((res) => {
        navigate("/employee");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-5">
      <h2>Add Employee</h2>

      <form className="row g-3 w-50">
        <div className="col-12">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
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
            onChange={(e) => setData({ ...data, gmail: e.target.value })}
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Address"
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
            onChange={(e) => setData({ ...data, salary: e.target.value })}
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Default file input example</label>
          <input
            className="form-control"
            type="file"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={HandleClick}>
          Click To Add
        </button>
      </form>
    </div>
  );
}

export default Create;
