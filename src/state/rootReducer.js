
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import * as actionTypes from './actions';

const initialState = {
  squareModes: {},
  currentMode: 0,
  hoveredSquares: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SQUARE_MODES:
      return { ...state, squareModes: action.payload }
    
    case actionTypes.SET_CURRENT_MODE:
      return { ...state, currentMode: +action.payload, hoveredSquares: [] }

    case actionTypes.FINISH_GAME:
      return { ...state, currentMode: 0, hoveredSquares: [] }
    
    case actionTypes.ADD_TO_HOVERED:
      return {
        ...state,
        hoveredSquares: [ ...state.hoveredSquares, action.payload ]
      }
    
    case actionTypes.REMOVE_FROM_HOVERED:
      return {
        ...state,
        hoveredSquares: state.hoveredSquares.filter(el => el !== action.payload)
      }
      
    default:
      return state;
  }
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;