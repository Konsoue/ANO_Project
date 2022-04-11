import { SET_COM } from '../actions'
import initState from '../initState'
const COMReducer = (state = initState, action) => {

  switch (action.type) {
    case SET_COM:
      return {
        ...state,
        com: action.data,
      }
    default:
      return state
  }
}

export default COMReducer