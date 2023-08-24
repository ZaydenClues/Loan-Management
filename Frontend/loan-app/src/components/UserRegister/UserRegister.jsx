import React, { useEffect } from "react";
import styles from "./UserRegister.module.css";
import AdminNavBar from "../Admin/AdminNavBar/AdminNavBar";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { signup } from "../../Service/User/signup";
import { useUserContext } from "../../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserRegister = () => {
  const { userData, setUserData } = useUserContext();

  useEffect(() => {
    console.log(userData);

    if (userData && userData.exists === true) {
      if (userData.user.id === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  });

  const [dobDate, setdobDate] = useState(new Date());
  const [dojDate, setdojDate] = useState(new Date());
  const navigate = useNavigate();

  const designation = ["Program Associate", "Manager", "CEO"];
  const dept = ["Finance", "Technology", "Sales"];
  const gender = ["M", "F"];

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

  const handleDropdownChange = (event) => {
    console.log(event.target.id + " " + event.target.value);

    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    form.department = dept[parseInt(form.department)];
    form.designation = designation[parseInt(form.designation)];
    form.gender = gender[parseInt(form.gender)];
    form.date_of_birth = dobDate;
    form.date_of_joining = dojDate;

    if (
      form.employee_id === "" || form.employee_name === "" || form.department === ""
      || form.designation == "" || form.gender == "" || form.date_of_birth == "" || form.date_of_joining == ""
      || form.password == "" || form.cpassword == "")
    {
      toast.error("Please fill all the fields");
      return;
    }

    if(dojDate < dobDate){
      toast.error("Date of joining cannot be before date of birth");
      return;
    }

    if (form.password !== form.cpassword) {
      toast.error("Passwords do not match");
      return;
    }
    signup(form).then((res) => {
      if (res.success) {
        toast.success("User Registered Successfully");
        navigate("/login");
      } else {
        toast.error("User already exists");
      }
      
    });
    console.log(form);
  };

  return (
    <div>
      <div className={styles.addUser}>
        <form className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Register</h2>
          </div>
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
                  onChange={handleDropdownChange}
                >
                  <option>Select Department</option>
                  <option value="0">Finance</option>
                  <option value="1">Technology</option>
                  <option value="2">Sales</option>
                </select>
              </Form.Group>
              <br />
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="password"
                  placeholder="Password"
                  name="Password:"
                  value={form.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className={styles.group2}>
              <Form.Group controlId="designation" className={styles.dropdown}>
                <Form.Label>Designation:</Form.Label>
                <select
                  id="designation"
                  aria-label="Designation"
                  value={form.designation}
                  onChange={handleDropdownChange}
                >
                  <option>Select Designation</option>
                  <option value="0">Program Associate</option>
                  <option value="1">Manager</option>
                  <option value="2">CEO</option>
                </select>
              </Form.Group>
              <br />
              <Form.Group controlId="date_of_birth" className={styles.dropdown}>
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
              <br />
              <Form.Group controlId="cpassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="password"
                  placeholder="Confirm Password"
                  name="Confirm Password:"
                  value={form.cpassword}
                  onChange={handleChange}
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
                onChange={handleDropdownChange}
              >
                <option>Select Gender</option>
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>
            </Form.Group>
          </div>
          <Button variant="success" onClick={handleSubmit}>
            Register
          </Button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserRegister;