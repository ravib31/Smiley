import axios from "axios";
const apiUrl = "http://localhost:5000/api/photos/";

export const fetchPhotos = async () => {
  try {
    const response = await axios.get(apiUrl + "all");
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
};

export const savePhotoToDb = async (photo) => {
  try {
    const response = await axios.post(apiUrl + "save", { image: photo });
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
};
