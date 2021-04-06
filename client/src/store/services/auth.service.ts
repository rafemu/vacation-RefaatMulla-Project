import axios from "axios";
import { BASE_URL } from "../../config";
import { IUser, IUserRegister } from "../../interfaces";
import { getPayload } from "./token.service";

const API_URL = `${BASE_URL}/auth`;

async function loginService(userDetails: IUser) {
  const { data } = await axios.post(`${API_URL}/login`, userDetails);
  return data;
}

async function registerService(userDetails: IUserRegister) {
  const { data } = await axios.post(`${API_URL}/register`, userDetails);
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

export { loginService, getIsAdmin, registerService };
