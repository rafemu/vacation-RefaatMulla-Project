export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("VacationApp"));

  if (user && user.accessToken) {
    console.log(user);
    // return { Authorization: "Bearer " + user.accessToken };
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
