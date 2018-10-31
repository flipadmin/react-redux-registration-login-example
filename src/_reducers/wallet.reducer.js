import { walletConstants } from "../_constants";

export function wallet_lines(state = {}, action) {
  switch (action.type) {
    case walletConstants.LINES_REQUEST:
      return {
        gettingLines: true,
        items: action.data
      };
    case walletConstants.LINES_SUCCESS:
      return {
        // lines: action.lines
        loaded: true,
        items: action.data
      };
    case walletConstants.LINES_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
