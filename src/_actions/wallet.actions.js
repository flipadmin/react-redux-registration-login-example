import { walletConstants } from "../_constants";
import { userService } from "../_services";
import { walletService } from "../_services";
import { alertActions } from ".";
import { history } from "../_helpers";

export const walletActions = {
  get_lines
};

function get_lines(external_id, company_id) {
  return dispatch => {
    dispatch(request(external_id));

    walletService.get_lines(external_id, company_id).then(
      external_id => {
        console.log("This is my LINES --------");
        console.log(external_id);
        dispatch(success(external_id));
        history.push("/wallet_page");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(external_id) {
    return { type: walletConstants.LINES_REQUEST, external_id };
  }
  function success(external_id) {
    return { type: walletConstants.LINES_SUCCESS, external_id };
  }
  function failure(error) {
    return { type: walletConstants.LINES_FAILURE, error };
  }
}
