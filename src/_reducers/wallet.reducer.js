import { walletConstants } from "../_constants";

export function wallet_lines(state = {}, action) {
  switch (action.type) {
    case walletConstants.LINES_REQUEST:
      return {
        gettingLines: true
      };
    case walletConstants.LINES_SUCCESS:
      return {
        loaded: true,
        items: action.wallet_lines,
        external_user_sub: action.external_user_sub
      };
    case walletConstants.LINES_FAILURE:
      return {
        error: action.error
      };
    case walletConstants.CHARGE_REQUEST:
      return {
        chargingLines: true
      };
    case walletConstants.CHARGE_SUCCESS:
      return {
        items: action.wallet_lines
      };
    case walletConstants.LOCATION_CHANGE:
      return {};
    default:
      return state;
  }
}
