import React from "react";
import styles from "./LoginPage.module.css";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { login as AdminLogin } from "../../Service/Admin/login";
import { login as EmployeeLogin } from "../../Service/User/login";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";

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
            setUserData({ exists: true, user: res.data });
            return true;
          } else {
            alert("Invalid Username or Password");
            return false;
          }
        })
        .then((res) =>
          res ? navigate("/dashboard") : window.location.reload()
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
                </Form.Group>
                <br />
                <div className={styles.buttonContainer}>
                  <Button variant="danger" type="submit" onClick={handleSubmit}>
                    Login
                  </Button>
                </div>

                <br />
                <a href="/signup">Forgot Password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
