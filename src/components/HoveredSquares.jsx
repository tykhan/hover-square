import React from 'react'

import { Box, Typography } from '@material-ui/core'

export const HoveredSquares = ({ hoveredSquares }) => {
  return (
    <Box style={{ padding: 50 }}>
      {!!hoveredSquares.length && <Typography>Hovered squares:</Typography>}
      {hoveredSquares.map(square => (
        <Typography key={square}>{square}</Typography>
      ))}
    </Box>
  )
}
