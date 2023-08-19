import React from "react";
import styles from "./ViewPurchased.module.css";
import NavBar from "../NavBar/NavBar";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, Table } from "react-bootstrap";
import { useUserContext } from "../../Context/UserContext";
import { getitemspurchased } from "../../Service/User/viewapi";
import { useEffect } from "react";

const ViewPurchased = () => {
    const { userData, setUserData } = useUserContext();
    const [searchData, setSearchData] = React.useState("");
    const [itemsData, setItemsData] = React.useState([]);

    const filtereditemsData = itemsData.filter((items) => {
        return(
            items.item_description.toLowerCase().includes(searchData.toLowerCase()) ||
            items.item_make.toLowerCase().includes(searchData.toLowerCase()) || 
            items.item_category.toLowerCase().includes(searchData.toLowerCase()) ||
            items.issue_id.includes(searchData)
        );
    });

    const editRedirect = () => {
        window.location.href = "admin/edituser";
    }

    const handleDelete = () => {
        alert("User deleted successfully");
    }

    const handleSearch = (e) => {
        setSearchData(e.target.value);
    }

    useEffect(() => {
        getitemspurchased(userData.user.employee_id).then((res) => {
            console.log(res.data);
            setItemsData(res.data);
        });
    }, []);


  return (
    <div>
      <NavBar />
      <div className={styles.viewUser}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Purchased Items</h2>
          </div>
          <div>
            <div className={styles.searchContainer}>
            <Form.Control type="text" placeholder="Search" className={styles.searchBar} value={searchData} onChange={handleSearch}/>
            </div>
            <div className={styles.tableHolder}>
          <Table className={styles.tableContainer}>
            <thead className={styles.tableHeadr}>
                <tr>
                    <th>Issue ID</th>
                    <th>Item Description</th>
                    <th>Item Make</th>
                    <th>Item Category</th>
                    <th>Item Value</th>
                </tr>
            </thead>
 
            <tbody>
                {filtereditemsData.map((items) => (
                    <tr>
                        <td>{items.issue_id}</td>
                        <td>{items.item_description}</td>
                        <td>{items.item_make}</td>
                        <td>{items.item_category}</td>
                        <td>{items.item_valuation}</td>
                    </tr>
                ))}
            </tbody>
          </Table>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPurchased;
