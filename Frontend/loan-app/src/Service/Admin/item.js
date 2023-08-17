import axios from "axios";

const URL = "http://localhost:5068/api";

async function getAllItems() {
  try {
    const res = await axios.get(`${URL}/Items`);
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

async function addItem(data) {
  try {
    const res = await axios.post(`${URL}/Items`, {
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

async function editItem(data, id) {
  try {
    const res = await axios.put(`${URL + "/Items/" + id}`, {
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

async function deleteItem(id) {
  try {
    const res = await axios.delete(`${URL + "/Items/" + id}`);
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

export { getAllItems, addItem, editItem, deleteItem };
