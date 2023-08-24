import { Button } from 'react-bootstrap';
import styles from './404page.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react'


const Page404 = () => {

    const navigate = useNavigate();

    const redirect = () => {
        navigate(-2);
    }

  return (
    <>
    <div className={styles.pageContainer}>
        <img src='./assets/gif_404.gif' alt='404' className={styles.gif}/>
        <Button variant="danger" onClick={redirect}>Go Back</Button>
    </div>
    </>
  )
}

export default Page404