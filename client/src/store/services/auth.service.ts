import axios from "axios";
import { BASE_URL } from "../../config";
import { IUser } from "../../interfaces";
import { getPayload, getToken } from "./token.service";

const API_URL = `${BASE_URL}/auth/login`;

async function loginService(userDetails: IUser) {
  const { data } = await axios.post(`${API_URL}`, userDetails);
  return data;
}

function getIsAdmin() {
  const user = getPayload();
  if (!user) return;
  const { role } = user.data;
  if (!role) return;

  const isAdmin = role == "Admin" ? true : false;
  return isAdmin;
}

export { loginService, getIsAdmin };
