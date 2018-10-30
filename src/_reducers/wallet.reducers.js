import { walletConstants } from "../_constants";

export function wallet_lines(state = {}, action) {
  switch (action.type) {
    case walletConstants.LINES_REQUEST:
      return {
        loading: true
      };
    case walletConstants.LINES_SUCCESS:
      return {
        items: action.lines
      };
    case walletConstants.LINES_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
