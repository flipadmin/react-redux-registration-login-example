import config from "config";
import { authHeader } from "../_helpers";
import { wallet_lines } from "../_reducers/wallet.reducer";

export const walletService = {
  get_lines,
  charge
};

function get_lines(external_id, company_id) {
  let user_sub = JSON.parse(localStorage.getItem("user"));
  let new_token = JSON.parse(localStorage.getItem("new_token"));
  console.log({ user_sub, new_token });
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_sub, new_token, external_id, company_id })
  };
  const url = "/cs_admin_api/get_wallet_lines";
  const getTodo = async () => {
    const res = await fetch(url, requestOptions);
    const handle = await handleResponse(res);
    return handle;
  };
  return getTodo();
}

function charge(amount, title, external_user_sub) {
  let user_sub = JSON.parse(localStorage.getItem("user"));
  let new_token = JSON.parse(localStorage.getItem("new_token"));
  console.log({ amount, title });
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_sub,
      new_token,
      amount,
      title,
      external_user_sub
    })
  };
  const url = "/cs_admin_api/charge_user";
  const getTodo = async () => {
    const res = await fetch(url, requestOptions);
    const handle = await handleResponse(res);
    return handle;
  };
  return getTodo();
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        console.log("Im HERE1");
        console.log(data);
        const error = (data && data.message) || response.statusText;
        console.log({ error });
        return Promise.reject(error);
        // logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
