const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));

// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    roll: String,
    department: String,
    email: String
});

const Student = mongoose.model("Student", studentSchema);


// CREATE
app.post("/api/students", async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json(student);
});


// READ
app.get("/api/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});


// UPDATE
app.put("/api/students/:id", async (req, res) => {
    const student = await Student.findByIdAndUpdate(
        req.params.id, req.body,{ new: true });
    res.json(student);
});


// DELETE
app.delete("/api/students/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
        message: "Student deleted successfully"
    });
});


app.listen(process.env.PORT || 5000, () => {
    console.log("Server Running on port 5000");
});