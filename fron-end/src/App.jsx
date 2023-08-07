import React from "react";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./home";
import Employee from "./Employee";
import Create from "./AddEmployee";
import EmployeeEdit from "./EmployeeEdit";
import Start from "./start";
import EmployeeLogin from "./EmployeeLogin";
import EmployeeDetail from "./EmployeeDetail";
import PrivateComponent from "./PrivateComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<Start />}></Route>
        <Route path="/EmployeeLogin" element={<EmployeeLogin />}></Route>
        <Route path="/EmployeeDetail" element={<EmployeeDetail />}></Route>

        <Route path="/login" element={<Login />} />
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="/home" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/create" element={<Create />} />
            <Route path="/EmployeeEdit/:id" element={<EmployeeEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
