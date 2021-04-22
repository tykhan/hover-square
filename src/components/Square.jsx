import React from 'react'

import { Box } from '@material-ui/core'
export const Square = ({ rowIndex, colIndex, handleMouseEnter}) => {
  return (
    <Box
      id="block"
      value={`row ${rowIndex + 1} col ${colIndex + 1}`}
      style={{ width: 50, height: 50, border: '1px solid black' }}
      onMouseEnter={e => handleMouseEnter(e)}
      key={colIndex}
    />
  )
}
