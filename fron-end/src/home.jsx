import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [admincount, setAdminCount] = useState();
  const [employecount, setEmployeeCount] = useState();
  const [salaryCount, setSalaryCount] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8081/adminCount")
      .then((res) => {
        setAdminCount(res.data[0].admin);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/employeeCount")
      .then((res) => {
        setEmployeeCount(res.data[0].employee);
        console.log(res);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/salaryCount")
      .then((res) => {
        setSalaryCount(res.data[0].sumofsalary);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <b>
        <div className="p-3 d-flex justify-content-around mt-3">
          <div className="p-3 border shadow-sm w-25">
            <p>Admin</p>
            <hr />
            <p>Total:{admincount}</p>
          </div>
          <div className="p-3 border shadow-sm w-25">
            <p>Employee</p>
            <hr />
            <p>Total:{employecount}</p>
          </div>
          <div className="p-3 border shadow-sm w-25">
            <p>Salary</p>
            <hr />
            <p>Total:{salaryCount}</p>
          </div>
        </div>
      </b>
    </div>
  );
}

export default Home;
