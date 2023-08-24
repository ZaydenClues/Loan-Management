import React from "react";
import Table from "react-bootstrap/Table";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import { useEffect, useState } from "react";
import { deleteItem, editItem, getAllItems } from "../../../Service/Admin/item";
import { Form, Button } from "react-bootstrap";
import AddItem from "./AddItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ItemTable() {
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(-1);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    item_id: "",
    item_description: "",
    item_status: "",
    item_make: "",
    item_category: "",
    item_valuation: "",
  });

  const item_category = ["Furniture", "Electronics", "Stationery", "Crokery"];
  const item_status = ["Yes", "No"];
  const item_make = ["Wodden", "Metal", "Plastic", "Glass"];

  const handleChange = (event) => {
    console.log(event.target.id + " " + event.target.value);
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });

    console.log(form);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleEdit = (index) => {
    form.item_id = items[index].item_id;
    form.item_description = items[index].item_description;
    form.item_status = items[index].item_status;
    form.item_make = items[index].item_make;
    form.item_category = items[index].item_category;
    form.item_valuation = items[index].item_valuation;

    setEdit(index);
  };
  const handleSave = () => {
    console.log(form);

    editItem(form, form.item_id)
      .then((res) => {
        if (res.success) {
          toast.success("Item Edited Successfully");
        } else {
          toast.error("Item Edit Failed");
        }
      })
      .then(() => setTimeout(()=>window.location.reload()), 1000);

    setEdit(-1);
  };

  const handleDiscard = () => {
    setEdit(-1);
  };
  const handleDelete = (item_id) => {
    deleteItem(item_id)
      .then((res) => {
        if (res.success) {
          toast.success("Item Deleted Successfully");
        } else {
          toast.error( "Item Deletion Failed");
        }
      })
      .then(() => setTimeout(()=>window.location.reload()), 1000);
  };

  useEffect(() => {
    getAllItems().then((res) => {
      if (res.success) {
        setItems(res.data);
      }
    });
  }, []);

  console.log(items);
  console.log(form);
  return (
    <div>
      <AdminNavBar />
      <Table responsive="sm" size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Id</th>
            <th>Description</th>
            <th>Issue Status</th>
            <th>Item Make</th>
            <th>Item Category</th>
            <th>Item Valuation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Form.Group controlId="item_id">
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder={item.item_id}
                    name="item_id"
                    readOnly
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="item_description">
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder={item.item_description}
                    name="item_description"
                    readOnly={edit === index ? false : true}
                    value={
                      edit === index
                        ? form.item_description
                        : item.item_description
                    }
                    onChange={edit === index ? handleChange : () => true}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="item_status">
                  {edit === index ? (
                    <select
                      id="item_status"
                      aria-label="Item Status"
                      value={form.item_status}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    >
                      <option>Select Status</option>
                      {item_status.map((status, index) => (
                        <option key={index} value={status[0]}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Form.Control
                      autoComplete="off"
                      type="text"
                      placeholder={item.item_status}
                      name="item_status"
                      readOnly={edit === index ? false : true}
                    />
                  )}
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="item_make">
                  {edit === index ? (
                    <select
                      id="item_make"
                      aria-label="Item Make"
                      value={form.item_make}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    >
                      <option>Select Item Make</option>
                      {item_make.map((make, index) => (
                        <option key={index} value={make}>
                          {make}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Form.Control
                      autoComplete="off"
                      type="text"
                      placeholder={item.item_make}
                      name="item_make"
                      readOnly={edit === index ? false : true}
                    />
                  )}
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="item_category">
                  {edit === index ? (
                    <select
                      id="item_category"
                      aria-label="Item Category"
                      value={form.item_category}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    >
                      <option>Select Category</option>
                      {item_category.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Form.Control
                      autoComplete="off"
                      type="text"
                      placeholder={item.item_category}
                      name="item_category"
                      readOnly={edit === index ? false : true}
                    />
                  )}
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="item_valuation">
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder={item.item_valuation}
                    name="item_valuation"
                    readOnly={edit === index ? false : true}
                    value={
                      edit === index ? form.item_valuation : item.item_valuation
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
                    onClick={() => handleDelete(item.item_id)}
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
          Add New_Item
        </Button>
      </div>
      <AddItem open={open} handleClose={handleClose} />
      <ToastContainer />
    </div>
  );
}

export default ItemTable;
