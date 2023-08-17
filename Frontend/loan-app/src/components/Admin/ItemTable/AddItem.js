import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { IconButton } from "@mui/material";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import styles from "./AddItem.module.css";
import { Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { signup } from "../../../Service/User/signup";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../../Service/Admin/item";

function AddItem({ open, handleClose }) {
  const navigate = useNavigate();

  const item_category = ["Furniture", "Electronics", "Stationery", "Crokery"];
  const item_status = ["Y", "N"];
  const item_make = ["Wodden", "Metal", "Plastic", "Glass"];

  const [form, setForm] = useState({
    item_id: "",
    item_description: "",
    item_status: "",
    item_make: "",
    item_category: "",
    item_valuation: "",
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
    form[event.target.id] = event.target.value;
    setForm({
      ...form,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    form.item_category = item_category[parseInt(form.item_category)];
    form.item_make = item_make[parseInt(form.item_make)];
    form.item_status = item_status[parseInt(form.item_status)];

    addItem(form)
      .then((res) => {
        if (res.success) {
          window.alert("Item Added Successfully!!");
          return true;
        } else {
          window.alert(res.error);
          return false;
        }
      })
      .then((res) => (res ? window.location.reload() : console.log("error")));
    console.log(form);
  };
  return (
    <Dialog open={open} onClose={() => handleClose()} fullWidth maxWidth="md">
      <>
        <DialogTitle id="simple-dialog-title" className={styles.formHeader}>
          Add New Item
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
                <Form.Group controlId="item_id">
                  <Form.Label>Item ID:</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder=""
                    name="Item ID:"
                    value={form.item_id}
                    onChange={handleChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="item_description">
                  <Form.Label>Item Description:</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder=""
                    name="Item Description:"
                    value={form.item_description}
                    onChange={handleChange}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="item_status" className={styles.dropdown}>
                  <Form.Label>Item Status:</Form.Label>
                  <select
                    id="item_status"
                    aria-label="Item Status"
                    value={form.item_status}
                    onChange={handleDropdownChange}
                  >
                    <option>Select Status</option>
                    <option value="0">Yes</option>
                    <option value="1">No</option>
                  </select>
                </Form.Group>
              </div>

              <div className={styles.group2}>
                <Form.Group
                  controlId="item_category"
                  className={styles.dropdown}
                >
                  <Form.Label>Item Category:</Form.Label>
                  <select
                    id="item_category"
                    aria-label="Item Category"
                    value={form.item_category}
                    onChange={handleDropdownChange}
                  >
                    <option>Select Category</option>
                    <option value="0">Furniture</option>
                    <option value="1">Electronics</option>
                    <option value="2">Stationary</option>
                    <option value="3">Crokery</option>
                  </select>
                </Form.Group>
                <br />
                <Form.Group controlId="item_make" className={styles.dropdown}>
                  <Form.Label>Item Make:</Form.Label>
                  <select
                    id="item_make"
                    aria-label="Designation"
                    value={form.item_make}
                    onChange={handleDropdownChange}
                  >
                    <option>Select Item Make</option>
                    <option value="0">Wodden</option>
                    <option value="1">Metal</option>
                    <option value="2">Plastic</option>
                    <option value="3">Glass</option>
                  </select>
                </Form.Group>
                <br />
                <Form.Group controlId="item_valuation">
                  <Form.Label>Item Valuation:</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder="Item Valuation"
                    name="Item Valuation:"
                    value={form.item_valuation}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>

            <Button variant="success" type="submit" onClick={handleSubmit}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default AddItem;
