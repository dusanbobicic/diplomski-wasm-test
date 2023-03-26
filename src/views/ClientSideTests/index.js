import React, { useCallback, useState } from 'react'
import RGBGrayScaleTest from './RGBGrayScaleTest';
import { Box, makeStyles, TextField, MenuItem } from '@material-ui/core';
import RGBInvertTest from './RGBInvertTest';
import FibonacciTest from './FibonacciTest';
import StockholmInvertTest from './StockholmInvertTest';


const ClientSideTests = () => {
    const [selectedTest, setSelectedTest] = useState('RGBGrayScale')

    const testSelector = (test) => {
        switch (test) {
            case 'RGBGrayScale':
                return (<RGBGrayScaleTest />);
            case 'RGBInvert':
                return (<RGBInvertTest />);
            case 'StockholmInvertTest':
                return (<StockholmInvertTest />);
            case 'FibonacciTest':
                return (<FibonacciTest />);
            default:
                return (<></>);
        }
    };
    const handleChangeTest = useCallback((e) => {
        setSelectedTest(e.target.value);
    }, [setSelectedTest]);
    return (
        <Box>
            <Box>
                <TextField
                    label={'Test'}
                    select
                    onChange={handleChangeTest}
                    value={selectedTest}
                >
                    <MenuItem value={"RGBGrayScale"}>RGB Grayscale</MenuItem>
                    <MenuItem value={"RGBInvert"}>RGB Invert</MenuItem>
                    <MenuItem value={"StockholmInvertTest"}>Stockholm Invert</MenuItem>
                    <MenuItem value={"FibonacciTest"}>Fibonacci</MenuItem>
                </TextField>
            </Box>
            <Box>
                {testSelector(selectedTest)}
            </Box>
        </Box>
    )
}

export default ClientSideTests
