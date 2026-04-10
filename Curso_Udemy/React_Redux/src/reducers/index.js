import { combineReducers } from "redux";

import frutaReducers from "./fruta.reducer";

const reducers = combineReducers({
  frutas: frutaReducers,
});

export default reducers;
