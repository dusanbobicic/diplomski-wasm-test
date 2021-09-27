import { Info, Speed, Timer, TimerOff } from '@material-ui/icons';
import React from 'react'
import { Box } from '@material-ui/core';

const spanStyle={
    minHeight:"24px",
    display: 'inline-flex',
    alignItems: 'center',
}
const TestResultDataInfo = (props) => {
    const {timeStart, timeEnd, testName} =props.resultInfo; 
    
    return (
        <Box>
            <div><span style={spanStyle}><Info/>{` - ${testName}`}</span></div>
            <div><span style={spanStyle}><Timer/>{` - ${timeStart}`}</span></div>
            <div><span style={spanStyle}><TimerOff/>{` - ${timeEnd}`}</span></div>
            <div><span style={spanStyle}><Speed/>{` - ${timeEnd-timeStart} [ms]`}</span></div>
        </Box>
    )
}

export default TestResultDataInfo
