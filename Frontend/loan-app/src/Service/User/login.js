import axios from "axios";

const URL = "http://localhost:5068/api";

export async function login(data) {
  try {
    const res = await axios.post(`${URL}/Employees/login`, {
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
