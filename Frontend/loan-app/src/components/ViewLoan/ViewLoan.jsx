import React from "react";
import styles from "./ViewLoan.module.css";
import NavBar from "../NavBar/NavBar";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, Table } from "react-bootstrap";
import { useUserContext } from "../../Context/UserContext";
import { getloanspurchased } from "../../Service/User/viewapi";
import { useEffect } from "react";

const ViewLoan = () => {
    const { userData, setUserData } = useUserContext();
    const [searchData, setSearchData] = React.useState("");
    const [loansData, setLoansData] = React.useState([]);

    const filteredloansData = loansData.filter((loans) => {
        return(
            //loans.item_description.toLowerCase().includes(searchData.toLowerCase()) ||
            loans.card_issue_date.toLowerCase().includes(searchData.toLowerCase()) || 
            loans.loan_type.toLowerCase().includes(searchData.toLowerCase()) ||
            loans.loan_id.includes(searchData)  
            //loans.duration.includes(searchData)
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
        getloanspurchased(userData.user.employee_id).then((res) => {
            console.log(res.data);
            // const data = res.data.filter((loans) => {
            //   var returnDate = new Date(loans.card_issue_date);
            //   const newDate = addYears(returnDate, loans.duration);
            //   return newDate > new Date();
            // }
            // );
            setLoansData(res.data);
        });
    }, []);


  return (
    <div>
      <NavBar />
      <div className={styles.viewUser}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Purchased Loans</h2>
          </div>
          <div>
            <div className={styles.searchContainer}>
            <Form.Control type="text" placeholder="Search" className={styles.searchBar} value={searchData} onChange={handleSearch}/>
            </div>
            <div className={styles.tableHolder}>
          <Table className={styles.tableContainer}>
            <thead className={styles.tableHeadr}>
                <tr>
                    <th>Loan ID</th>
                    <th>Loan Type</th>
                    <th>Duration</th>
                    <th>Card Issue Date</th>
                </tr>
            </thead>
 
            <tbody>
                {filteredloansData.map((loans) => (
                    <tr>
                        <td>{loans.loan_id}</td>
                        <td>{loans.loan_type}</td>
                        <td>{loans.duration}</td>
                        <td>{loans.card_issue_date}</td>
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

export default ViewLoan;
