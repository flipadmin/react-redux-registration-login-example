import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import { wallet_lines } from "./wallet.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  wallet_lines
});

export default rootReducer;
