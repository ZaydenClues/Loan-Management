import React from "react";
import Table from "react-bootstrap/Table";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import { useEffect, useState } from "react";
import {
  editEmployeeData,
  getAllEmployeesData,
  deleteEmployee,
} from "../../../Service/Admin/employee";
import { Form, Button, Toast } from "react-bootstrap";
import AddUser from "../AddUser/AddUser";
import AlertDialog from "./AlertDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewCustomersData() {
  const [cust_Data, setCust_Data] = useState([]);
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
  const designation = ["Program Associate", "Manager", "CEO"];
  const department = ["Finance", "Technology", "Sales"];
  const gender = ["Male", "Female"];
  const [form, setForm] = useState({
    employee_id: "",
    employee_name: "",
    designation: "",
    department: "",
    gender: "",
    date_of_birth: "",
    date_of_joining: "",
  });

  const handleEdit = (index) => {
    form.employee_id = cust_Data[index].employee_id;
    form.employee_name = cust_Data[index].employee_name;
    form.designation = cust_Data[index].designation;
    form.department = cust_Data[index].department;
    form.gender = cust_Data[index].gender;
    form.date_of_birth = cust_Data[index].date_of_birth;
    form.date_of_joining = cust_Data[index].date_of_joining;

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

    editEmployeeData(form, form.employee_id)
      .then((res) => {
        if (res.success) {
          toast.success("Item Edited Successfully!!");
        } else {
          toast.error(res.error);
        }
      })
      .then(() => setTimeout(() => {
        window.location.reload();
      }
      , 2000));

    setEdit(-1);
  };

  const handleDelete = (employee_id) => {
    deleteEmployee(employee_id)
      .then((res) => {
        if (res.success) {
          toast.success("Item Deleted Successfully!!");
        } else {
          toast.error(res.error);
        }
      })
      .then(() => setTimeout(() => {
        window.location.reload();
      }
      , 2000));
  };

  const handleDiscard = () => {
    setEdit(-1);
  };
  useEffect(() => {
    getAllEmployeesData().then((res) => {
      if (res.success) {
        setCust_Data(res.data);
      } else {
        toast.error(res.error);
      }
    });
  }, []);

  console.log(cust_Data);
  return (
    <div>
      <AdminNavBar />
      <Table responsive="sm" size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Gender</th>
            <th>Date_Of_Birth</th>
            <th>Date_Of_Joining</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cust_Data.map((cust_Data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Form.Group controlId="employee_id">
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder={cust_Data.employee_id}
                    name="employee_id"
                    readOnly
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="employee_name">
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder={cust_Data.employee_name}
                    name="employee_name"
                    readOnly
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="designation">
                  {edit === index ? (
                    <select
                      id="designation"
                      aria-label="Designation"
                      value={form.designation}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    >
                      <option>Select Designation</option>
                      {designation.map((designation, index) => (
                        <option key={index} value={designation}>
                          {designation}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Form.Control
                      autoComplete="off"
                      type="text"
                      placeholder={cust_Data.designation}
                      name="designation"
                      readOnly={true}
                    />
                  )}
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="department">
                  {edit === index ? (
                    <select
                      id="department"
                      aria-label="Department"
                      value={form.department}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    >
                      <option>Select Department</option>
                      {department.map((department, index) => (
                        <option key={index} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Form.Control
                      autoComplete="off"
                      type="text"
                      placeholder={cust_Data.department}
                      name="department"
                      readOnly={edit === index ? false : true}
                    />
                  )}
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="gender">
                  {edit === index ? (
                    <select
                      id="gender"
                      aria-label="Gender"
                      value={form.gender}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    >
                      <option>Select Gender</option>
                      {gender.map((g, index) => (
                        <option key={index} value={g[0]}>
                          {g}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Form.Control
                      autoComplete="off"
                      type="text"
                      placeholder={cust_Data.gender}
                      name="gender"
                      readOnly={edit === index ? false : true}
                    />
                  )}
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="date_of_birth">
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder={cust_Data.date_of_birth}
                    name="date_of_birth"
                    readOnly={edit === index ? false : true}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="date_of_joining">
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder={cust_Data.date_of_joining}
                    name="date_of_joining"
                    readOnly={edit === index ? false : true}
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
                    onClick={() => handleDelete(cust_Data.employee_id)}
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
          Add New_Employee
        </Button>
      </div>
      <AddUser open={open} handleClose={handleClose} />
      {/* <AlertDialog
        open={alertDelete}
        handleClose={handleAlertDeleteClose}
        handleDelete={handleDelete}
      /> */}
      <ToastContainer />
    </div>
  );
}

export default ViewCustomersData;
