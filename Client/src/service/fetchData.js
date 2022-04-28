import axios from "axios";

const fetchData = async (baseURL) => {
  try {
    const data = await axios.get(baseURL);
    return data.data.data;
  } catch (err) {
    throw err;
  }
};

export default fetchData;
