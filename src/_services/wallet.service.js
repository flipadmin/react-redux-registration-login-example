import config from "config";
import { authHeader } from "../_helpers";
import { wallet_lines } from "../_reducers/wallet.reducer";

export const walletService = {
  get_lines
};

function get_lines(external_id, company_id) {
  console.log({ external_id, company_id });
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ external_id, company_id })
  };
  const url = "/cs_admin_api/test_react";

  // fetch(url).then(handleResponse);
  // .then(data => {
  //   if (data) {
  //     // store user details and jwt token in local storage to keep user logged in between page refreshes
  //     localStorage.setItem("wallet_test", JSON.stringify(data));
  //   }
  //   console.log("I didf not get here");
  //   console.log({ data });
  //   return data;
  // });
  const getTodo = async () => {
    const res = await fetch(url);
    const handle = await handleResponse(res);
    return handle;
    // const { timer, power } = await res.json();
    // console.log(timer, power);
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
    console.log({ data });
    return data;
  });
}
