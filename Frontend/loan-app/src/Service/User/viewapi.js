import axios from "axios";

const URL = "https://localhost:5068/api";

export async function getitemspurchased(id) {
  try {
    const res = await axios.get(`${URL}/UserAction/GetItemsPurchased/${id}`);
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

export async function getloanspurchased(id) {
  try {
    const res = await axios.get(`${URL}/UserAction/GetLoansPurchased/${id}`);
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
