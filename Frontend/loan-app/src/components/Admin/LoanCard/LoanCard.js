import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { IconButton } from "@mui/material";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import styles from "./LoanCard.module.css";
import { Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { signup } from "../../../Service/User/signup";
import { useNavigate } from "react-router-dom";
import { addLoanData } from "../../../Service/Admin/loan";

function LoanCard({ open, handleClose }) {
    
  const navigate = useNavigate();

  const loan_type = ["Furniture", "Electronics", "Stationery", "Crokery"];

  

  const [form, setForm] = useState({
    loan_id: "",
    loan_type: "",
    duration_in_years : ""
    
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

    addLoanData(form)
      .then((res) => {
        if (res.success) {
          window.alert("Loan Created Successfully!!");
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
    <Dialog open={open} onClose={() => handleClose()} fullWidth maxWidth="sm">
      <>
        <DialogTitle id="simple-dialog-title" className={styles.formHeader}>
          Add Loan Data
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
                <Form.Group controlId="loan_id">
                  <Form.Label>Loan ID:</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder="Loan ID"
                    name="Loan ID:"
                    value={form.loan_id}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <br />
                <Form.Group controlId="loan_type" className={styles.dropdown}>
                  <Form.Label>Loan Type:</Form.Label>
                  <select
                    id="loan_type"
                    aria-label="Loan Type"
                    value={form.loan_type}
                    onChange={handleChange}
                  >
                    <option>Select Type</option>
                    {loan_type.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Form.Group>
            
<br/>
              
              <Form.Group controlId="duration_in_years">
                  <Form.Label>Duration:</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder="Duration"
                    name="Duration:"
                    value={form.duration_in_years}
                    onChange={handleChange}
                  />
                </Form.Group>
               
                </div>
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

export default LoanCard;
