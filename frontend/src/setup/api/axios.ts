import axios from "axios";

export const getAuthUser = async () => {
  try {
    const res = await axios.get("/api/users/getAuthUser");
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
