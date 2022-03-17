import { createStore } from 'redux'
import reducers from './reducer'
import initState from './initState'

const store = createStore(reducers, initState)

export default store

