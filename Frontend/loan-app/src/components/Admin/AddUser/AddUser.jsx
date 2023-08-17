import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { IconButton } from "@mui/material";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import styles from "./AddUser.module.css";
import { Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { signup } from "../../../Service/User/signup";
import { useNavigate } from "react-router-dom";

function AddUser({ open, handleClose }) {
  const [dobDate, setdobDate] = useState(new Date());
  const [dojDate, setdojDate] = useState(new Date());
  const navigate = useNavigate();

  const designation = ["Program Associate", "Manager", "CEO"];
  const department = ["Finance", "Technology", "Sales"];
  const gender = ["Male", "Female"];

  const handleDobChange = (date) => {
    console.log(date.target.value);
    setdobDate(date.target.value);
  };

  const handleDojChange = (date) => {
    console.log(date.target.value);
    setdojDate(date.target.value);
  };

  const [form, setForm] = useState({
    employee_id: "",
    employee_name: "",
    designation: "",
    department: "",
    gender: "",
    date_of_birth: "",
    date_of_joining: "",
  });

  const handleChange = (event) => {
    console.log(event.target.id + " " + event.target.value);
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });

    console.log(form);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    form.date_of_birth = dobDate;
    form.date_of_joining = dojDate;
    form.password = form.employee_id + "123";
    form.cpassword = form.employee_id + "123";
    if (form.password !== form.cpassword) {
      window.alert("Password and Confirm Password do not match");
      return;
    }
    signup(form)
      .then((res) => {
        if (res.success) {
          window.alert("Account Created Successfully!!");
          return true;
        } else {
          window.alert(res.error);
          return false;
        }
      })
      .then((res) => window.location.reload());
    console.log(form);
  };
  return (
    <Dialog open={open} onClose={() => handleClose()} fullWidth maxWidth="md">
      <>
        <DialogTitle id="simple-dialog-title" className={styles.formHeader}>
          Add Customer Data
        </DialogTitle>

        <IconButton
          style={{
            fontSize: "20px",
            position: "absolute",
            right: "16px",
            top: "16px",
          }}
          onClick={() => handleClose()}
        >
          <ClearSharpIcon />
        </IconButton>
      </>

      <div style={{ flex: "1", padding: "20px" }}>
        <div className={styles.addUser}>
          <div className={styles.formContainer}>
            <div className={styles.formGroup}>
              <div className={styles.group1}>
                <Form.Group controlId="employee_id">
                  <Form.Label>Employee ID:</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder="Employee ID"
                    name="Employee ID:"
                    value={form.employee_id}
                    onChange={handleChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="employee_name">
                  <Form.Label>Employee Name:</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder="Employee Name"
                    name="Employee Name:"
                    value={form.employee_name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="department" className={styles.dropdown}>
                  <Form.Label>Department:</Form.Label>
                  <select
                    id="department"
                    aria-label="Department"
                    value={form.department}
                    onChange={handleChange}
                  >
                    <option>Select Department</option>
                    {department.map((department, index) => (
                      <option key={index} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </div>

              <div className={styles.group2}>
                <Form.Group controlId="designation" className={styles.dropdown}>
                  <Form.Label>Designation:</Form.Label>
                  <select
                    id="designation"
                    aria-label="Designation"
                    value={form.designation}
                    onChange={handleChange}
                  >
                    <option>Select Designation</option>
                    {designation.map((designation, index) => (
                      <option key={index} value={designation}>
                        {designation}
                      </option>
                    ))}
                  </select>
                </Form.Group>
                <br />
                <Form.Group
                  controlId="date_of_birth"
                  className={styles.dropdown}
                >
                  <Form.Label>Date of Birth:</Form.Label>
                  <Form.Control
                    type="date"
                    value={dobDate}
                    onChange={handleDobChange}
                  />
                </Form.Group>
                <br />
                <Form.Group
                  controlId="date_of_joining"
                  className={styles.dropdown}
                >
                  <Form.Label>Date of Joining:</Form.Label>
                  <Form.Control
                    dateformat="dd-MM-yyyy"
                    type="date"
                    value={dojDate}
                    onChange={handleDojChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className={styles.bottomGroup}>
              <Form.Group controlId="gender" className={styles.dropdown}>
                <Form.Label>Gender:</Form.Label>
                <select
                  id="gender"
                  aria-label="Gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option>Select Gender</option>
                  {gender.map((g, index) => (
                    <option key={index} value={g[0]}>
                      {g}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </div>
            <Button variant="success" type="submit" onClick={handleSubmit}>
              Add Data
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default AddUser;
