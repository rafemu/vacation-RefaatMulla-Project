import axios from "axios";
import { BASE_URL } from "../../config";
import authHeader from "./auth-header";

const API_URL = `${BASE_URL}/vacation`;
async function getVacationsService() {
  const { data } = await axios.get(`${API_URL}`, {
    headers: { "x-access-token": localStorage.getItem("VacationApp") },
  });

  return data.result;
}

async function addNewVacationsService(newVacation: any) {
  const { destination, description, startAt, endAt, price, file } = newVacation;
  const formData = new FormData();
  formData.append("destination", destination);
  formData.append("description", description);
  formData.append("startAt", startAt);
  formData.append("endAt", endAt);
  formData.append("price", price);
  formData.append("file", file);

  const { data } = await axios.post(`${API_URL}/createVacation`, formData, {
    headers: {
      "x-access-token": localStorage.getItem("VacationApp"),
      "content-type": "multipart/form-data",
    },
  });

  return data.result;
}

export { getVacationsService, addNewVacationsService };
