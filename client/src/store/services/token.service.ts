function setToken(token: string) {
  localStorage.setItem("VacationApp", token);
}
function getToken() {
  return localStorage.getItem("VacationApp");
}
function deleteToken() {
  localStorage.removeItem("VacationApp");
}
function getPayload() {
  const token = getToken();
  let payload;
  if (token) {
    try {
      payload = token.split(".")[1];
      payload = JSON.parse(atob(payload));
      const checkExpirationDate = getExpirationDate(payload);
      if (!checkExpirationDate) return;
      const checkIfExpired = isExpired(checkExpirationDate);
      if (checkIfExpired) {
        localStorage.removeItem("VacationApp");
        window.location.href = "/";
        throw new Error("token has been expaired");
      }
      return payload;
    } catch (error) {
      console.log(error);
      if (payload == undefined) {
        return deleteToken();
      }
    }
  }
}

function getExpirationDate(jwtToken?: any) {
  if (!jwtToken) {
    return null;
  }
  const checkExpirationDate = jwtToken.exp * 1000 || null;
  return checkExpirationDate;
}

function isExpired(exp?: number) {
  if (!exp) {
    return false;
  }

  return Date.now() > exp;
}

export { setToken, getToken, deleteToken, getPayload };
