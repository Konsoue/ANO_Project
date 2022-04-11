import { combineReducers } from "redux";
import statisticsReducer from './statistics'
import COMReducer from './COM'

const reducers = combineReducers({
  statistics: statisticsReducer,
  com: COMReducer
})

export default reducers