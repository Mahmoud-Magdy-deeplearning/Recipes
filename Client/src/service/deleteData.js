import axios from "axios";

const deleteData = async (baseURL, id) => {
  try {
    const data = await axios.delete(baseURL + "/" + id);
    return data.data.data;
  } catch (err) {
    console.log(err);

    return err;
  }
};

export default deleteData;
