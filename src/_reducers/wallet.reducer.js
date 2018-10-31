import { walletConstants } from "../_constants";

const initialState = {
  items: [],
  gettingLines: false,
  loaded: false
};

export function wallet_lines(state = initialState, action) {
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
