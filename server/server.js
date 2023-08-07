import express, { response } from "express";
import cors from "cors";
import mysql from "mysql";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Emploiee_Management_System",
});

conn.connect(function (err) {
  if (err) {
    console.log("error in connection");
  } else {
    console.log("connected");
  }
});

const verifyuser = (req, resp, next) => {
  const token = resp.cookie.token;
  if (!token) {
    return resp.json({ Error: "You Are Not Authorized" });
  } else {
    jwt.verify(token, "jwt-token-key", (err, decoded) => {
      if (err) {
        return resp.json({ Error: "TOken Wrong" });
      } else {
        next();
      }
    });
  }
};

app.get("/dashboard", verifyuser, (req, resp) => {
  return resp.json({ Status: "Success" });
});

app.get("/deleteclick", (req, resp) => {
  resp.clearCookie("token");
  return resp.json({ Status: "Success" });
});

app.post("/login", (req, resp) => {
  const sql = "SELECT * FROM `login` WHERE gmail = ? AND password = ?";
  conn.query(sql, [req.body.gmail, req.body.password], (err, result) => {
    if (err) {
      return resp.json({ statu: "error", Error: "Error In Running Query" });
    }
    if (result.length > 0) {
      const id = result[0].id;
      const token = jwt.sign({ id }, "jwt-token-key", { expiresIn: "2h" });
      resp.cookie("token", token);
      return resp.json({ status: "sucess", token });
    } else {
      return resp.json({ status: "Error", Error: "Wrong Gmail And Password" });
    }
  });
});

app.post("/empolyeelogin", (req, resp) => {
  const sql = "SELECT * FROM employee WHERE gmail = ? AND password = ?";
  conn.query(sql, [req.body.gmail, req.body.password], (err, result) => {
    if (err) {
      return resp.json({ statu: "error", Error: "Error In Running Query" });
    }
    if (result.length > 0) {
      const id = result[0].id;
      const token = jwt.sign({ id }, "jwt-token-key", { expiresIn: "2h" });
      resp.cookie("token", token);
      return resp.json({ status: "sucess", token });
    } else {
      return resp.json({ status: "Error", Error: "Wrong Gmail And Password" });
    }
  });
});

// app.post("/create", upload.single("image"), (req, resp) => {
//   const sql =
//     "INSERT INTO employee (`name`, `gmail`, `password`, `address`, `salary`, `image`) VALUES (?)";
//   bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
//     if (err) return resp.json({ Error: "Error in hasing password" });
//     const values = [
//       req.body.name,
//       req.body.gmail,
//       hash,
//       req.body.address,
//       req.body.salary,
//       req.file.filename,
//     ];
//     conn.query(sql, [values], (err) => {
//       if (err) return resp.json({ Error: "Inside error" });
//       return resp.json({ Status: "Success" });
//     });
//   });
// });

app.post("/create", upload.single("image"), (req, resp) => {
  const sql =
    "INSERT INTO employee (`name`, `gmail`, `password`, `address`, `salary`, `image`) VALUES (?)";
  // bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
  //   if (err) return resp.json({ Error: "Error in hasing password" });
  const values = [
    req.body.name,
    req.body.gmail,
    req.body.password,
    req.body.address,
    req.body.salary,
    req.file.filename,
  ];
  conn.query(sql, [values], (err) => {
    if (err) return resp.json({ Error: "Inside error" });
    return resp.json({ Status: "Success" });
    // });
  });
});

app.get("/getemployee", (req, resp) => {
  const sql = "SELECT * FROM employee";
  conn.query(sql, (err, result) => {
    if (err) return resp.json({ Error: "Error" });
    return resp.json({ Status: "Success", Result: result });
  });
});

app.get("/get/:id", (req, resp) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `employee` WHERE id = ?";
  conn.query(sql, [id], (err, result) => {
    if (err) return resp.json({ Error: "Error" });
    return resp.json({ Status: "Success", Result: result });
  });
});

app.put("/update/:id", (req, resp) => {
  const id = req.params.id;

  const sql = "UPDATE employee  SET salary = ? WHERE id = ?";
  conn.query(sql, [req.body.salary, id], (err, result) => {
    if (err) return resp.json({ Error: "Error" });
    return resp.json({ Status: "Success", Result: result });
  });
});

app.delete("/delete/:id", (req, resp) => {
  const id = req.params.id;
  const sql = "DELETE FROM `employee` WHERE id = ?";
  conn.query(sql, [id], (err, result) => {
    if (err) return resp.json({ Error: "Error in Deleting" });
    return resp.json({ Status: "Success" });
  });
});

app.get("/adminCount", (req, resp) => {
  const sql = "Select count(id) as admin from login";
  conn.query(sql, (err, result) => {
    if (err) return resp.json({ Error: "Error In Adim Count" });
    return resp.json(result);
  });
});
app.get("/employeeCount", (req, resp) => {
  const sql = "SELECT COUNT(id) AS employee FROM `employee` ";
  conn.query(sql, (err, result) => {
    if (err) return resp.json({ Error: "Error In employee Count" });
    return resp.json(result);
  });
});
app.get("/salaryCount", (req, resp) => {
  const sql = "select sum(salary) as sumofsalary from employee";
  conn.query(sql, (err, result) => {
    if (err) return resp.json({ Error: "Error In Summing salary" });
    return resp.json(result);
  });
});

app.listen(8081, () => {
  console.log("running");
});
