import axios from "axios";
const updateImage = async (baseURL, id, data) => {
  try {
    const result = await axios.put(baseURL + "/updateImage/" + id, data, {
      headers: { "Content-Type": `multipart/form-data; ` },
    });
    return result;
  } catch (err) {
    console.log(err);

    return err;
  }
};

const updateData = async (baseURL, id, data) => {
  try {
    const result = await axios.put(baseURL + "/" + id, data);
    return result;
  } catch (err) {
    console.log(err);

    return err;
  }
};

export { updateImage, updateData };
