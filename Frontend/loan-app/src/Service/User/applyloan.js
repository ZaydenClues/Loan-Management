import axios from "axios";

const URL = "https://localhost:5068/api";

export async function getitemdetails() {
  try {
    const res = await axios.get(`${URL}/ApplyLoan/GetItems`);
    console.log(res.data);
    return { success: true, data: res.data };
  } catch (error) {
    if (error.response) {
      return { success: false, error: error.response.data };
    } else {
      return {
        success: false,
        error: "Error occured while sending the request",
      };
    }
  }
}

export async function applyLoan(data) {
    try {
        const res = await axios.post(`${URL}/ApplyLoan`, {
        ...data,
        });
        console.log(res.data);
    
        return { success: true, data: res.data };
    } catch (error) {
        if (error.response) {
        return { success: false, error: error.response.data };
        } else {
        return {
            success: false,
            error: "Error occured while sending the request",
        };
        }
    }
    }

export async function getLoanCardData(){
    try {
        const res = await axios.get(`${URL}/ApplyLoan/GetLoanCardData`);
        console.log(res.data);
        return { success: true, data: res.data };
      } catch (error) {
        if (error.response) {
          return { success: false, error: error.response.data };
        } else {
          return {
            success: false,
            error: "Error occured while sending the request",
          };
        }
      }
}
