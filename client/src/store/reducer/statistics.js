import { UPDATE_STATISTICS } from '../actions'
import initState from '../initState'
const statisticsReducer = (state = initState, action) => {

  switch (action.type) {
    case UPDATE_STATISTICS:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}

export default statisticsReducer