import React, { useEffect } from "react";
import styles from "./UserSignup.module.css";
import AdminNavBar from "../Admin/AdminNavBar/AdminNavBar";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { signup } from "../../Service/User/signup";
import { useUserContext } from "../../Context/UserContext";
import {checkuser, updatePassword} from "../../Service/User/signup";


const UserSignup = () => {
  const [dobDate, setdobDate] = useState(new Date());

  const handleDobChange = (date) => {
    console.log(date.target.value);
    setdobDate(date.target.value);
  };

  const [form, setForm] = useState({
    
    employee_id: "",
    date_of_birth: "",
    password: "",   
    
  });

  const handleChange = (event) => {
    console.log(event.target.id + " " + event.target.value);
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });

    console.log(form)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    form.date_of_birth = dobDate;

    form.password = form.password.toString();
    form.cpassword = form.cpassword.toString();

    if(form.password !== form.cpassword) {
      alert("Passwords do not match");
      return;
    }

    checkuser({"employee_id" : form.employee_id, "date_of_birth" : form.date_of_birth})
    .then((res) => {
      console.log(res);
      if(res.data == ""){
        alert("Employee ID does not exist");
        return;
      }
      if(new Date(res.data.date_of_birth).toDateString() == new Date(dobDate).toDateString()){
        updatePassword({"id" : form.employee_id, "password": form.password});
        alert("Verified!");
        window.location.href = "/";
      } else {
        console.log(new Date(res.data.date_of_birth) + " " + new Date(dobDate));
        alert("Date of Birth does not match with Employee ID");
      }
    })
    .catch((err) => {
      console.log(err);
    })


    //signup(form)
    console.log(form);
  }

  return (
    <div>
      <div className={styles.addUser}>
        <form className={styles.formContainer}>
        <div className={styles.formHeader}>
            <h2>Reset Password</h2>
        </div>
          <Form className={styles.formGroup}>
            <div className={styles.group1}>
              <Form.Group controlId="employee_id">
                <Form.Label>Employee ID:</Form.Label>
                <Form.Control
                  autocomplete="off"
                  type="text"
                  placeholder="Employee ID"
                  name="Employee ID:"
                  value={form.employee_id}
                  onChange={handleChange}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  autocomplete="off"
                  type="password"
                  placeholder="Password"
                  name="Password:"
                  value={form.password}
                  onChange={handleChange}
                />
              </Form.Group>          
            </div>

            <div className={styles.group2}>
              <Form.Group controlId="date_of_birth" className={styles.dropdown}>
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control type="date" value={dobDate} onChange={handleDobChange} />
              </Form.Group>
              <br />
              <Form.Group controlId="cpassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  autocomplete="off"
                  type="password"
                  placeholder="Confirm Password"
                  name="Confirm Password:"
                  value={form.cpassword}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </Form>

          <Button variant="success" type="submit" onClick={handleSubmit}>
            Verify & Create
          </Button>
        </form>
      </div>
    </div>
  )
};

export default UserSignup;
