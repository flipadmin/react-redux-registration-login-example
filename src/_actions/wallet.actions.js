import { walletConstants } from "../_constants";
import { userService } from "../_services";
import { walletService } from "../_services";
import { alertActions } from ".";
import { history } from "../_helpers";
import { wallet_lines } from "../_reducers/wallet.reducer";

export const walletActions = {
  get_lines
};

function get_lines(external_id, company_id) {
  return dispatch => {
    dispatch(request());

    const wallet = async () => {
      try {
        const res = await walletService.get_lines(external_id, company_id);
        console.log({ res });
        const { timer } = await res;
        if (timer) {
          const succes = await dispatch(success(timer));
        }
      } catch (error) {
        console.log(error);
      }
    };
    wallet();
  };

  // walletService.get_lines(external_id, company_id).then(
  //   data => {
  //     console.log("This is my LINES --------");
  //     console.log(data);
  //     dispatch(success(data));
  //     history.push("/wallet_page");
  //   },
  //   error => {
  //     dispatch(failure(error.toString()));
  //     dispatch(alertActions.error(error.toString()));
  //   }
  // );
  // };

  function request() {
    return { type: walletConstants.LINES_REQUEST };
  }
  function success(data) {
    return { type: walletConstants.LINES_SUCCESS, data };
  }
  function failure(error) {
    return { type: walletConstants.LINES_FAILURE, error };
  }
}
