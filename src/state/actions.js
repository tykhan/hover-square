export const GET_SQUARE_MODES = 'GET_SQUARE_MODES'
export const SET_SQUARE_MODES = 'SET_SQUARE_MODES'
export const SET_CURRENT_MODE = 'SET_CURRENT_MODE'
export const ADD_TO_HOVERED = 'ADD_TO_HOVERED'
export const REMOVE_FROM_HOVERED = 'REMOVE_FROM_HOVERED'
export const FINISH_GAME = 'FINISH_GAME'

export const fetchSquareModes = () => {
  return async(dispatch) => {
    try {
      const response = await fetch('https://demo1030918.mockable.io');
      const modes = await response.json();
      dispatch(setSquareModes(modes))
    } catch (error) {
      console.error('Error while loading presets!');
      dispatch(setSquareModes({
        '3x3': {field: 3},
        '6x6': {field: 6},
        '9x9': {field: 9},
      }))
    }
  }
}

export const setSquareModes = modes => ({
  type: SET_SQUARE_MODES,
  payload: modes,
})

export const setCurrentMode = mode => ({
  type: SET_CURRENT_MODE,
  payload: mode,
})

export const finishGame = () => ({
  type: FINISH_GAME,
})

export const addToHovered = squareInfo => ({
  type: ADD_TO_HOVERED,
  payload: squareInfo,
})

export const removeFromHovered = id => ({
  type: REMOVE_FROM_HOVERED,
  payload: id,
})