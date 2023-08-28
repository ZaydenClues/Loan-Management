import React from "react";
import styles from "./LoginPage.module.css";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { login as AdminLogin } from "../../Service/Admin/login";
import { login as EmployeeLogin } from "../../Service/User/login";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const { userData, setUserData } = useUserContext();

  useEffect(() => {
    console.log(userData.data);
    if (userData.exists === true) {
      if (userData.user?.id === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  });

  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(event.target.id);
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.id === "admin") {
      AdminLogin(form)
        .then((res) => {
          console.log(res.data);
          if (res.success === true) {
            window.sessionStorage.setItem("user", JSON.stringify(res.data)); // Store in session storage
            setUserData({ exists: true, user: res.data });
          } else {
            window.sessionStorage.setItem("user", null); // Store in session storage

            alert("Invalid Username or Password");
          }
        })
        .then(() => navigate("/admin/dashboard"));
    } else {
      EmployeeLogin(form)
        .then((res) => {
          console.log(res);
          if (res.success) {
            window.sessionStorage.setItem("user", JSON.stringify(res.data)); // Store in session storage
            console.log("login", res.data);
            setUserData({ exists: true, user: res.data.employee });
            return true;
          } else {
            
            return false;
          }
        })
        .then((res) => {
          if(res)
            navigate("/dashboard")
          else{
            toast.error("Invalid Username or Password");
            //redirect after 3 seconds
            // setTimeout(() => {
            //   navigate("/register");
            // }
            // , 3000);
          }            
        }
        );
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.formContainer}>
        <div className={styles.leftHalf}>
          <div className={styles.logo}>
            <img alt="wells" src="./assets/wells.png" width={300} />
          </div>
        </div>
        <div className={styles.rightHalf}>
          <div className={styles.form}>
            <h1>Welcome!</h1>
            <form>
              <div className={styles.formGroup}>
                <Form.Group controlId="id">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="off"
                    type="text"
                    placeholder="Enter username"
                    name="username"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid username.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="off"
                    type="password"
                    placeholder="Enter password"
                    name="password"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid password.
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <div className={styles.buttonContainer}>
                  <Button variant="danger" type="submit" onClick={handleSubmit}>
                    Login
                  </Button>
                </div>

                <br />
                <a href="/signup">Forgot Password?</a>
                
                <a href="/register">Don't have an account?</a>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
