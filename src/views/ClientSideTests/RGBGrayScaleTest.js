import React, { useCallback, useEffect, useState } from 'react';
import testImage1 from '../../shared/assets/img_1920x1080_rgb.png';
import Jimp from 'jimp';
import { Box, Button, Grid, MenuItem, TextField } from '@material-ui/core';
import TestResultDataInfo from '../../components/TestResultDataInfo';
import { getImageData, writeImageDataToCanvas } from '../../utils/image';
import { grayScale_average, grayScale_luma, grayScale_w1,grayScale_GT601 } from '../../utils/wasm/grayscale_loader';

const RGBGrayScaleTest = () => {
    const [imageData, setImageData] = useState(testImage1);
    const [imageDataWasm, setImageDataWasm] = useState(testImage1);
    const [imageJSTestData, setImageJSTestData] = useState({ testName: 'Grayscale', timeStart: 'N/A', timeEnd: 'N/A' });
    const [imageWASMTestData, setImageWASMTestData] = useState({ testName: 'Grayscale', timeStart: 'N/A', timeEnd: 'N/A' });
    const [wasmGrayscaleType, setWasmGrayscaleType] = useState('average');

    useEffect(() => {

        async function imgEffect() {
            const loadImage = await Jimp.read(testImage1);
            const mime = await loadImage.getBase64Async(Jimp.MIME_PNG);
            setImageData(mime);
            setImageDataWasm(mime)
        }

        imgEffect();
        return ()=>{setImageData(null); setImageDataWasm(null);}
    }, []);

    const runTestJS = useCallback(async () => {
        const loadImage = await Jimp.read(testImage1);

        const time_start_grayscale = performance.now()
        await loadImage.grayscale();
        const time_end_grayscale = performance.now();
        // console.log(time_start_grayscale,time_end_grayscale,time_end_grayscale-time_start_grayscale);
        setImageJSTestData({ testName: 'Grayscale', timeStart: time_start_grayscale, timeEnd: time_end_grayscale });
        const mime = await loadImage.getBase64Async(Jimp.MIME_PNG);
        setImageData(mime);
    }, [setImageData]);


    const resetTestJS = useCallback(async () => {
        setImageData(testImage1);
    }, []);

    const runTestWasm = useCallback(async () => {
        const data = await getImageData({ url: imageDataWasm });
        let time_start_grayscale = 0;
        let time_end_grayscale = 0;
        let wasmData = [];
        switch (wasmGrayscaleType) {
            case 'average':
                time_start_grayscale = performance.now();
                wasmData = await grayScale_average(data.data);
                time_end_grayscale = performance.now();
                break;
            case 'weighted':
                time_start_grayscale = performance.now();
                wasmData = await grayScale_w1(data.data);
                time_end_grayscale = performance.now();
                break;
            case 'luma':
                time_start_grayscale = performance.now();
                wasmData = await grayScale_luma(data.data);
                time_end_grayscale = performance.now();
                break;
            case 'gt601':
                time_start_grayscale = performance.now();
                wasmData = await grayScale_GT601(data.data);
                time_end_grayscale = performance.now();
                break;
            default:
                // error?
                wasmData = data.data;
        }
        const canvas = document.createElement('canvas');
        setImageDataWasm(writeImageDataToCanvas(canvas, wasmData, data.width, data.height).toDataURL());
        setImageWASMTestData({ testName: 'Grayscale', timeStart: time_start_grayscale, timeEnd: time_end_grayscale });
    })

    const resetTestWasm = useCallback(async () => {
        setImageDataWasm(testImage1);
    }, []);

    const handleChangeGrayscaleType = useCallback((e) => {
        setWasmGrayscaleType(e.target.value);
    })

    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item>
                    <img src={imageData} width={455} height={256} />
                    <Box>
                        <Button onClick={runTestJS}>Run JS Test</Button>
                        <Button onClick={resetTestJS}>Reset Test</Button>
                    </Box>
                    <Box>
                        Results:
                    <TestResultDataInfo resultInfo={imageJSTestData} />
                    </Box>
                </Grid>
                <Grid item>
                    <img src={imageDataWasm} width={455} height={256} />
                    <Box>
                        <TextField
                            label={'Grayscale Type'}
                            select
                            onChange={handleChangeGrayscaleType}
                            value={wasmGrayscaleType}
                        >
                            <MenuItem value={"average"}>Grayscale Average</MenuItem>
                            <MenuItem value={"weighted"}>Grayscale Weigthed</MenuItem>
                            <MenuItem value={"luma"}>Grayscale Luma</MenuItem>
                            <MenuItem value={"gt601"}>Grayscale GT601</MenuItem>
                        </TextField>
                    </Box>
                    <Box>
                        <Button onClick={runTestWasm}>Run WASM Test</Button>
                        <Button onClick={resetTestWasm}>Reset WASM Test</Button>
                    </Box>
                    <Box>
                        Results:
                    <TestResultDataInfo resultInfo={imageWASMTestData} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default RGBGrayScaleTest
