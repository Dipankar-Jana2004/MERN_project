import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css"

const API = "http://localhost:5000/api/students";

function App() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    roll: "",
    department: "",
    email: "",
  });

  const [editID, setEditID] = useState(null);


  const fetchStudent = async () => {
    try {
      const res = await axios.get(API);
      setStudents(res.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editID) {
        await axios.put(`${API}/${editID}`, form);
        setEditID(null);
      } else {
        await axios.post(API, form);
      }

      setForm({
        name: "",
        roll: "",
        department: "",
        email: "",
      });

      fetchStudent();
    } catch (error) {
      console.log("Error:", error);
    }
  };


  const handleEdit = (student) => {
    setEditID(student._id);

    setForm({
      name: student.name,
      roll: student.roll,
      department: student.department,
      email: student.email,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchStudent();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  return (
    <div>
      <h3>Student Management System</h3>

      <form onSubmit={handleSubmit}>
        <input placeholder="Student Name"         value={form.name}onChange={(e) =>setForm({ ...form, name: e.target.value })}required/>

        <input placeholder="Roll Number"          value={form.roll} onChange={(e) => setForm({ ...form, roll: e.target.value })} required/>

          <input placeholder="Student Department"   value={form.department}onChange={(e) =>setForm({ ...form, department: e.target.value })} required/>

        <input placeholder="Student Email"        value={form.email} onChange={(e) =>setForm({ ...form, email: e.target.value })}required/>

        <button type="submit">
          {editID ? "Update Student" : "Add Student"}
        </button>
      </form>

      <h3>All Student Details</h3>

      <table border="1">
        <thead>
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.roll}</td>
              <td>{s.name}</td>
              <td>{s.department}</td>
              <td>{s.email}</td>

              <td>
                <button onClick={() => handleEdit(s)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(s._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;