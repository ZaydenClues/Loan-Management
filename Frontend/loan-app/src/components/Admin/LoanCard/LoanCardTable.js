import React from "react";
import Table from "react-bootstrap/Table";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import { useEffect, useState } from "react";

import { Form, Button } from "react-bootstrap";
import LoanCard from "./LoanCard";
import { deleteLoanCard, editLoanCardData, getAllLoanCardData } from "../../../Service/Admin/loan";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoanCardTable() {
  const [loan_Data, setLoan_Data] = useState([]);
  const [edit, setEdit] = useState(-1);
  const [open, setOpen] = useState(false);

  const [alertDelete, setAlertDelete] = useState(true);

  const handleAlertDeleteOpen = () => {
    setAlertDelete(true);
  };

  const handleAlertDeleteClose = () => {
    setAlertDelete(false);
  };

  ///
  const loan_type = ["Furniture", "Electronics", "Stationery", "Crokery"];

  

  const [form, setForm] = useState({
    loan_id: "",
    loan_type: "",
    duration_in_years : ""
    
  });


  const handleEdit = (index) => {
    form.loan_id = loan_Data[index].loan_id;
    form.loan_type = loan_Data[index].loan_type;
    form.duration_in_years = loan_Data[index].duration_in_years;
    

    setEdit(index);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    console.log(event.target.id + " " + event.target.value);
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });

    console.log(form);
  };

  const handleSave = () => {
    console.log(form);

    editLoanCardData(form, form.loan_id)
      .then((res) => {
        if (res.success) {
          toast.success("Loan Card Edited Successfully");
        } else {
          toast.error("Loan Card Edit Failed");
        }
      })
      .then(() => setTimeout(()=>window.location.reload()), 1000);

    setEdit(-1);
  };

  const handleDelete = (loan_id) => {
    deleteLoanCard(loan_id)
      .then((res) => {
        if (res.success) {
          toast.success("Loan Card Deleted Successfully");
        } else {
          toast.error( "Loan Card Deletion Failed");
        }
      })
      .then(() => setTimeout(()=>window.location.reload()), 1000);
  };

  const handleDiscard = () => {
    setEdit(-1);
  };
  useEffect(() => {
    getAllLoanCardData().then((res) => {
      if (res.success) {
        setLoan_Data(res.data);
      } else {
        toast.error("Error Fetching Loan Card Data");
      }
    });
  }, []);

  console.log(loan_Data);
  return (
    <div>
      <AdminNavBar />
      <Table responsive="sm" size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Loan Id</th>
            <th>Loan Type</th>
            <th>Duration</th>
            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loan_Data.map((loan_Data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Form.Group controlId="loan_id">
                <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder={loan_Data.loan_id}
                    name="Loan ID:"
                    readOnly
                  />
                  
                </Form.Group>
              </td>
              
              <td>
              <Form.Group controlId="loan_type" >
                  {edit === index ? (
                    <select
                    id="loan_type"
                    aria-label="Loan Type"
                    value={form.loan_type}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    >
                      <option>Select Type</option>
                    {loan_type.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  ) : (
                    <Form.Control
                      autoComplete="off"
                      type="text"
                      placeholder={loan_Data.loan_type}
                      name="loan_type"
                      readOnly={edit === index ? false : true}
                    />
                  )}
                </Form.Group>
              </td>
              <td>
              <Form.Group controlId="duration_in_years">
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder={loan_Data.duration_in_years}
                    name="duration_in_years"
                    readOnly={edit === index ? false : true}
                    value={
                      edit === index ? form.duration_in_years: loan_Data.duration_in_years
                    }
                    onChange={edit === index ? handleChange : () => true}
                  />
                </Form.Group>
              </td>
              

              <td style={{ display: "flex", justifyContent: "space-between" }}>
                {edit === index ? (
                  <Button variant="success" onClick={handleSave} size="sm">
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => handleEdit(index)}
                    size="sm"
                  >
                    Edit
                  </Button>
                )}

                {edit === index ? (
                  <Button variant="warning" onClick={handleDiscard} size="sm">
                    Discard
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(loan_Data.loan_id)}
                    size="sm"
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button variant="primary" onClick={handleOpen} size="md">
          Add New_Data
        </Button>
      </div>
      <LoanCard open={open} handleClose={handleClose} />
      {/* <AlertDialog
        open={alertDelete}
        handleClose={handleAlertDeleteClose}
        handleDelete={handleDelete}
      /> */}
      <ToastContainer />
    </div>
  );
}

export default LoanCardTable;
