import axios from "axios";

const URL = "https://localhost:5068/api";

async function getAllEmployeesData() {
  try {
    const res = await axios.get(`${URL}/Employees`);
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

async function editEmployeeData(data, id) {
  try {
    const res = await axios.put(`${URL + "/Employees/" + id}`, {
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

async function deleteEmployee(id) {
  try {
    const res = await axios.delete(`${URL + "/Employees/" + id}`);
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

export { getAllEmployeesData, editEmployeeData, deleteEmployee };
