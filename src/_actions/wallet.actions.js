import { walletConstants } from "../_constants";
import { walletService } from "../_services";
import { alertActions } from ".";

export const walletActions = {
  get_lines,
  charge
};

function get_lines(external_id, company_id) {
  return dispatch => {
    dispatch(request());

    const wallet = async () => {
      try {
        const res = await walletService.get_lines(external_id, company_id);
        const { new_token, wallet_lines, external_user_sub } = await res;
        if (new_token) {
          await dispatch(success(wallet_lines, external_user_sub));
        }
      } catch (error) {
        console.log({ error });
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    };
    wallet();
  };
  function request() {
    return { type: walletConstants.LINES_REQUEST };
  }
  function success(wallet_lines, external_user_sub) {
    return {
      type: walletConstants.LINES_SUCCESS,
      wallet_lines,
      external_user_sub
    };
  }
  function failure(error) {
    return { type: walletConstants.LINES_FAILURE, error };
  }
}

function charge(amount, title, external_user_sub) {
  return dispatch => {
    dispatch(request());

    const wallet = async () => {
      try {
        const res = await walletService.charge(
          amount,
          title,
          external_user_sub
        );
        const { new_token, wallet_lines } = await res;
        if (new_token) {
          await dispatch(success(wallet_lines));
        }
      } catch (error) {
        dispatch(failure(error));
        dispatch(alertActions.error(error.toString()));
      }
    };
    wallet();
  };
  function request() {
    return { type: walletConstants.CHARGE_REQUEST };
  }
  function success(wallet_lines) {
    return {
      type: walletConstants.CHARGE_SUCCESS,
      wallet_lines
    };
  }
  function failure(error) {
    return { type: walletConstants.CHARGE_FAILURE, error };
  }
}
