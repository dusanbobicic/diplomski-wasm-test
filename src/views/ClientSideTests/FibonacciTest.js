import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import TestResultDataInfo from '../../components/TestResultDataInfo';
import { sumFactFibo } from '../../utils/math';
import { sumFactFibo as sumFactFiboWasm } from '../../utils/wasm/math_loader';
const boxStyles={
    marginTop:'20px'
}

const FibonacciTest = () => {
    const [fibResultJS, setFibResultJS] = useState('N/A');
    const [fibResultWASM, setFibResultWASM] = useState('N/A');
    const [fibJSTestData, setFibJSTestData] = useState({ testName: 'Sum of factorials of Fibonacci sequence for N elements', timeStart: 'N/A', timeEnd: 'N/A' });
    const [fibWASMTestData, setFibWASMTestData] = useState({ testName: 'Sum of factorials of Fibonacci sequence for N elements', timeStart: 'N/A', timeEnd: 'N/A' });
    const [numberOfElements, setNumberOfElements] = useState(0);


    const runTestJS = useCallback(async () => {

        const time_start_grayscale = performance.now()
        const sum = BigInt(sumFactFibo(numberOfElements));
        const time_end_grayscale = performance.now();
        setFibResultJS(sum);
        setFibJSTestData({ testName: 'Sum of factorials of Fibonacci sequence for N elements', timeStart: time_start_grayscale, timeEnd: time_end_grayscale });
    }, [numberOfElements]);


    const runTestWasm = useCallback(async () => {
        const time_start_grayscale = performance.now()
        const sum = sumFactFiboWasm(numberOfElements);
        const time_end_grayscale = performance.now();
        setFibResultWASM(sum);
        setFibWASMTestData({ testName: 'Sum of factorials of Fibonacci sequence for N elements', timeStart: time_start_grayscale, timeEnd: time_end_grayscale });
    }, [numberOfElements]);

    const handleChangeNumOfE = useCallback((e)=>{
        setNumberOfElements(e.target.value)
    },[]);

    return (
        <Box style={boxStyles}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <TextField
                    label={'Number of Fibonacci elements:'} 
                    value={numberOfElements} onChange={handleChangeNumOfE} />
                </Grid>
                <Grid item>
                    <Box>
                        <Button onClick={runTestJS}>Run JS Test</Button>
                    </Box>
                    <Box>
                        Results:
                    <TestResultDataInfo resultInfo={fibJSTestData} />
                    </Box>
                </Grid>
                <Grid item>
                    <Box>

                    </Box>
                    <Box>
                        <Button onClick={runTestWasm}>Run WASM Test</Button>
                    </Box>
                    <Box>
                        Results:
                    <TestResultDataInfo resultInfo={fibWASMTestData} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default FibonacciTest;