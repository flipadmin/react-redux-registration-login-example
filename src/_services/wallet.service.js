import config from "config";
import { authHeader } from "../_helpers";

export const walletService = {
  get_lines
};

function get_lines(external_id, company_id) {
  console.log(external_id, company_id);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ external_id, company_id })
  };
  const url = "/cs_admin_api/test_post_react";

  fetch(url, requestOptions)
    .then(handleResponse)
    .then(user_data => {
      console.log(user_data);
      if (user_data) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("wallet_test", JSON.stringify(user_data));
      }
    });
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
