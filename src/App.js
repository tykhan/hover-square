import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Select,
  MenuItem,
  Box,
  Button,
} from '@material-ui/core'

import './App.css';
import * as actions from './state/actions';
import { DialogWindow } from './components/DialogWindow'
import { HoveredSquares } from './components/HoveredSquares'
import { Square } from './components/Square'

function App() {
  const dispatch = useDispatch();
  const modes = useSelector(state => state.squareModes)
  const currentMode = useSelector(state => state.currentMode)
  const hoveredSquares = useSelector(state => state.hoveredSquares)
  const [gameStarted, setGameStarted] = useState(false)
  const [isDialogFinishOpen, setIsDialogFinishOpen] = useState(false)
  const [isDialogVictoryOpen, setIsDialogVictoryOpen] = useState(false)
  const blockRef = useRef(null);

  useEffect(() => {
    dispatch(actions.fetchSquareModes())
  }, [dispatch])

  const handleMouseEnter = (e) => {
    const hoveredDiv = e._targetInst.pendingProps.value;

    if (hoveredSquares.includes(hoveredDiv)) {
      dispatch(actions.removeFromHovered(hoveredDiv))
      e.target.style.backgroundColor = 'white';
    } else {
      dispatch(actions.addToHovered(hoveredDiv))
      e.target.style.backgroundColor = 'blue';
    }

    if (checkIfAllSquareHovered()) {
      setIsDialogVictoryOpen(true)
    }
  }

  const handleStartFinish = () => {
    if (gameStarted) {
      setIsDialogFinishOpen(true)
    } else {
      setGameStarted(prevState => !prevState)
    }
  }

  const hanldeModeSelect = e => {
    dispatch(actions.setCurrentMode(e.target.value))
    let squaresList = blockRef?.current?.querySelectorAll('div')
    if (squaresList) {
      let squaresArray = [...squaresList]
      squaresArray.forEach(square => square.style.backgroundColor = 'white')
    }
  }

  const checkIfAllSquareHovered = useCallback(
    () => {
      let areHovered = true
      let squaresList = blockRef?.current?.querySelectorAll('#block')

      if (squaresList) {
        [...squaresList].forEach(square => {
          if (square.style.backgroundColor !== 'blue') {
            areHovered = false
            return
          }
        })
      }
      
      return areHovered;
    },
    [],
  )

  const handleFinishGame = () => {
    setIsDialogFinishOpen(false)
    setGameStarted(false)
    dispatch(actions.finishGame())
  }
  const percentsOfHovered = ((100 / (currentMode * currentMode)) * hoveredSquares.length).toFixed(1)

  const generateSquares = () => {
    if (!currentMode || currentMode === 0) {
      return
    }
    const array = Array.from(Array(currentMode), () => Array(currentMode).fill(currentMode))

    return (
      <Box style={{ marginTop: 20 }} ref={blockRef}>
        {array.map((rowEl, rowIndex) => {
          return (
            <Box
              style={{ height: 50, width: 'fit-content', border: '1px solid black', display: 'flex' }}
              key={rowIndex}
            >
              {rowEl.map((_, colIndex) => (
                  <Square
                    handleMouseEnter={handleMouseEnter}
                    colIndex={colIndex}
                    rowIndex={rowIndex}
                  />
                )
              )}
            </Box>
          )
        })}
      </Box>
    )
  }

  return (
    <Box className="App" >
      <Box style={{ width: 'fit-content' }}>
        <Box>
          <Select
            displayEmpty
            onChange={(e) => hanldeModeSelect(e)}
            value={currentMode}
            style={{ width: 150 }}
          >
            <MenuItem value={0} defaultValue>Pick mode...</MenuItem>
            {Object.entries(modes).map(mode => (
                <MenuItem key={mode[0]} value={mode[1].field}>
                  {mode[0]}
                </MenuItem>
              )
            )}
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartFinish}
            disabled={currentMode === 0}
            style={{ marginLeft: 20 }}
          >
            {(!gameStarted || currentMode === 0) ? 'START' : 'FINISH'}
          </Button>
        </Box>
        {gameStarted && generateSquares()}
      </Box>
      <HoveredSquares hoveredSquares={hoveredSquares}/>
      <DialogWindow
        isDialogOpen={isDialogVictoryOpen ? isDialogVictoryOpen : isDialogFinishOpen}
        setIsDialogOpen={isDialogVictoryOpen ? setIsDialogVictoryOpen : setIsDialogFinishOpen}
        handleFinishGame={handleFinishGame}
        dialogContent={isDialogVictoryOpen ? "Victoryyy...You hovered 100% of squares!" : `You hovered ${hoveredSquares.length} (${percentsOfHovered})% squares`}
        dialogTitle={isDialogVictoryOpen ? "Do you want to finish this game?" : "Do you really want to finish?"}
      />
    </Box>
  );
}

export default App;
