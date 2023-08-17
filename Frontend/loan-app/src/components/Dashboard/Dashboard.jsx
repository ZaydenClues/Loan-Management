import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./Dashboard.module.css";

//function to send data to backend
const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  fetch("/api/login", {
    method: "POST",
    body: data,
  });
};

const Dashboard = () => {
  return (
    <div>
      <NavBar />
    <div className={styles.dashboard}>
      <a href="/viewloans"className={styles.card}>
      <div >
        <div className={styles.icon}>
          <img src="./assets/viewloans.png" width={100}/>
        </div>
        <h3>View Loans</h3>
      </div>
      </a>
      <a href="/applyloan" className={styles.card}>
      <div >
      <div className={styles.icon}>
          <img src="./assets/applyloan.png" width={100}/>
        </div>
      <h3>Apply for loan</h3>
      </div>
      </a>
      <a href="/viewitems" className={styles.card}>
      <div >
      <div className={styles.icon}>
          <img src="./assets/viewitems.png" width={100}/>
        </div>
      <h3>View Purchased</h3>
      </div>
      </a>
    </div>
    </div>
    
  );
};

export default Dashboard;
