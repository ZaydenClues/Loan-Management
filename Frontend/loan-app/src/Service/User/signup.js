import axios from "axios";

const URL = "https://localhost:5068/api";

export async function signup(data) {
  try {
    const res = await axios.post(`${URL}/Employees`, {
      ...data,
    });
    // const token = res.data.token
    console.log(res.data);
    return { success: true };
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

export async function updatePassword(data){
  try {

    const res = await axios.put(`${URL}/Employees/updatePassword`, {
      ...data,
    });
    // const token = res.data.token
    console.log(res);
    return { success: true };
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

export async function checkuser(data){
  try{
      const res = await axios.get(`${URL}/Employees/${data.employee_id}`)
      console.log(res.data);
      return {success:true,data:res.data}
  }
  catch(error){
      if(error.response){
          return {success:false,error:error.response.data.error}
      }
      else{
          return {
              success :false,
              error  : "Error occured while sending the request"
          }
      }
  }
}
