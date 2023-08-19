import axios from "axios";

const URL = "https://localhost:5068/api";

async function getAllLoanCardData() {
  try {
    const res = await axios.get(`${URL}/Loan_Card_Master`);
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

async function addLoanData(data) {
    try {
      const res = await axios.post(`${URL}/Loan_Card_Master`, {
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

async function editLoanCardData(data, id) {
  try {
    const res = await axios.put(`${URL + "/Loan_Card_Master/" + id}`, {
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

async function deleteLoanCard(id) {
  try {
    const res = await axios.delete(`${URL + "/Loan_Card_Master/" + id}`);
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

export { getAllLoanCardData,editLoanCardData,deleteLoanCard ,addLoanData};
