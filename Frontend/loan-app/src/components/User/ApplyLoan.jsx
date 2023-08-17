import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./ApplyLoan.module.css";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useUserContext } from "../../Context/UserContext";
import { getAllItems } from "../../Service/Admin/item";

const ApplyLoan = () => {
  const { userData, setUserData } = useUserContext();
  const item_category = ["Furniture", "Electronics", "Stationery", "Crokery"];
  const [items, setItems] = useState([]);
  const [tempItems1, setTempItems1] = useState([]);
  const [tempItems2, setTempItems2] = useState([]);
  const [tempItems3, setTempItems3] = useState([]);
  const [finalItem, setFinalItem] = useState([]);

  const [form, setForm] = useState({
    item_id: "",
    employee_id: "",
    loan_type: "",
  });

  const handleCategoryDropdown = (event) => {
    console.log(event.target.value);

    setTempItems1(
      items.filter((item) => item.item_category === event.target.value)
    );
  };

  const handleDescriptionDropdown = (event) => {
    console.log(event.target.value);
    setTempItems2(
      tempItems1.filter((item) => item.item_description === event.target.value)
    );
  };

  const handleMakeDropdown = (event) => {
    console.log(event.target.value);
    setTempItems3(
      tempItems2.filter((item) => item.item_make === event.target.value)
    );
  };

  const handleValuationDropdown = (event) => {
    console.log(event.target.value);
    // console.log("tempItems3", tempItems3);
    // console.log(
    //   tempItems3.filter((item) => item.item_valuation == event.target.value)
    // );
    setFinalItem(
      tempItems3.filter((item) => item.item_valuation == event.target.value)
    );

    console.log("finalItem", finalItem);
  };

  const handleApplyLoan = (event) => {
    event.preventDefault();
    console.log("finalItem", finalItem);

    form.item_id = finalItem[0].item_id;
    form.employee_id = userData.user.employee_id;
    form.loan_type = finalItem[0].item_category;
    console.log("form", form);

    // applyLoan(form).then((res) => {
    //   if (res.success) {
    //     console.log("res", res);
    //   }
    // });
  };

  useEffect(() => {
    getAllItems().then((res) => {
      if (res.success) {
        setItems(res.data);
      }
    });
  }, []);

  return (
    <div>
      <NavBar />
      <div className={styles.applyLoan}>
        <form className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Apply for Loan</h2>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.group1}>
              <Form.Group controlId="empid">
                <Form.Label>Employee ID:</Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="text"
                  placeholder={userData.user.employee_id}
                  name="Employee ID:"
                  readOnly
                />
              </Form.Group>
              <br />
              <Form.Group controlId="itemdesc" className={styles.dropdown}>
                <Form.Label>Item Description:</Form.Label>
                <select
                  aria-label="Item Description"
                  onChange={handleDescriptionDropdown}
                >
                  <option>Select Item Description</option>
                  {tempItems1.map((i, index) => (
                    <option key={index} value={i.item_description}>
                      {i.item_description}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </div>

            <div className={styles.group2}>
              <Form.Group controlId="itemcategory" className={styles.dropdown}>
                <Form.Label>Item Category:</Form.Label>
                <select
                  aria-label="Item Category"
                  onChange={handleCategoryDropdown}
                >
                  <option>Select Item Category</option>
                  {item_category.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <br />
              <Form.Group controlId="itemMake" className={styles.dropdown}>
                <Form.Label>Item Make:</Form.Label>

                <select aria-label="Item Make" onChange={handleMakeDropdown}>
                  <option>Select Item Make</option>
                  {tempItems2.map((i, index) => (
                    <option key={index} value={i.item_make}>
                      {i.item_make}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </div>
          </div>

          <div className={styles.bottomGroup}>
            <Form.Group controlId="itemcost" className={styles.dropdown}>
              <Form.Label>Item Cost:</Form.Label>
              <select aria-label="Item Cost" onChange={handleValuationDropdown}>
                <option>Select Item Cost</option>
                {tempItems3.map((i, index) => (
                  <option key={index} value={i.item_valuation}>
                    {i.item_valuation}
                  </option>
                ))}
              </select>
            </Form.Group>

            {/* <select aria-label="Item Make">
              <option>Select Item Make</option>
              <option value="1">Wooden</option>
              <option value="2">Steel</option>
              <option value="3">Plastic</option>
            </select> */}
          </div>
          <Button variant="success" type="submit">
            Apply Loan
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLoan;
