import React from "react";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import styles from "./AdminDashboard.module.css";
import { useUserContext } from "../../../Context/UserContext";
const AdminDashboard = () => {
  const { userData, setUserData } = useUserContext();

  console.log(userData);

  return (
    <div>
      <AdminNavBar />
      <div className={styles.dashboard}>
        <a href="/admin/adduser" className={styles.card}>
          <div>
            <div className={styles.icon}>
              <img src="../assets/customerdata.png" width={100} />
            </div>
            <h3>Customer Data</h3>
          </div>
        </a>
        <a href="/admin/loanCard" className={styles.card}>
          <div>
            <div className={styles.icon}>
              <img src="../assets/loancard.png" width={110} />
            </div>
            <h3>Loan Cards</h3>
          </div>
        </a>
        <a href="/admin/itemsMaster" className={styles.card}>
          <div>
            <div className={styles.icon}>
              <img src="../assets/itemsmaster.png" width={100} />
            </div>
            <h3>Items Master Data</h3>
          </div>
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;
