import axios from "axios";

const postData = async (baseURL, data) => {
  try {

    const result = await axios.post(baseURL, data, {
        headers: {    'Content-Type': `multipart/form-data; `,
        }
      ,
    });
    return result;
  } catch (err) {
    console.log("\n error is : " + err);
    return false;
  }
};

export default postData;
