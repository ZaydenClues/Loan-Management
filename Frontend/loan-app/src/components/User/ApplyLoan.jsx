import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./ApplyLoan.module.css";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useUserContext } from "../../Context/UserContext";
import { getitemdetails, applyLoan } from "../../Service/User/applyloan";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplyLoan = () => {
  const { userData, setUserData } = useUserContext();
  const [itemCategory, setItemCategory] = useState([]);
  const [items, setItems] = useState([]);

  const [tempItems1, setTempItems1] = useState([]);
  const [tempItems2, setTempItems2] = useState([]);
  const [tempItems3, setTempItems3] = useState([]);
  const [finalItem, setFinalItem] = useState([]);

  const [form, setForm] = useState({
    employee_id: "",
    item_category: "",
    item_id: ""
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
    setFinalItem(
      tempItems3.filter((item) => item.item_valuation == event.target.value)
    );

    console.log("finalItem", finalItem);
  };

  const handleApplyLoan = (event) => {
    event.preventDefault();
    console.log("finalItem", finalItem);

    if(finalItem.length === 0){
      toast.error("Please select all the fields");
      return;
    }

    form.employee_id = userData.user.employee_id;
    form.item_category = finalItem[0].item_category;
    form.item_id = finalItem[0].item_id;
    console.log("form", form);

    



    applyLoan(form).then((res) => {
      console.log(res);
      if (res.success) {
        toast.success("Loan Applied Successfully");
        window.location.href = "/dashboard";
      } else {
        toast.error("Failed to apply loan");
      }
      
    });
  };

  useEffect(() => {
    (async() => {
      const items = await getitemdetails();
      setItems(items.data);
      const itemCategory = [...new Set(items.data.map((item) => item.item_category))];
      setItemCategory(itemCategory);
    })();
    
  },[]);

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
                  {itemCategory.map((category, index) => (
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

          </div>
          <Button variant="success" onClick={handleApplyLoan}>
            Apply Loan
          </Button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ApplyLoan;
