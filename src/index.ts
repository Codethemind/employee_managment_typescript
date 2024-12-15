import mongoose from "mongoose";
import express, { Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
const employee= require('./model/employeeschema')


// import employee from "./model/employeeschema"; // Ensure correct import/export for employee model

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://mhdshahid88:906131@typescriptemployeemanag.gz8uv.mongodb.net/?retryWrites=true&w=majority&appName=Typescriptemployeemanagment"
  )
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

// Home route - get all employees
app.get("/", async (req: Request, res: Response) => {
  try {
    const employeelist = await employee.find();
    res.render("index", { employee: employeelist });
  } catch (err) {
    console.error("Error fetching employee list:", err);
    res.status(500).send("Error fetching employee list.");
  }
});

// Add new employee
app.post("/add", async (req: Request, res: Response) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      number: req.body.phone,
    };
    await employee.create(data);
    res.redirect("/");
  } catch (err) {
    console.error("Error adding employee:", err);
    res.status(500).send("Error adding employee.");
  }
});

// Delete an employee by ID
app.post("/delete/:id", async (req: Request, res: Response) => {
  try {
    await employee.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send("Error deleting employee.");
  }
});

// Edit an employee
app.post("/edit/:id", async (req: Request, res: Response) => {
  try {
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      number: req.body.phone,
    };
    await employee.findByIdAndUpdate(req.params.id, updatedData);
    res.redirect("/");
  } catch (error) {
    console.error("Error editing employee:", error);
    res.status(500).send("Error editing employee.");
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
