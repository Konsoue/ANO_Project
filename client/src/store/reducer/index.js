import { combineReducers } from "redux";
import statisticsReducer from './statistics'

const reducers = combineReducers({
  statistics: statisticsReducer
})

export default reducers