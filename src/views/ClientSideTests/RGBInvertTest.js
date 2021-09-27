import React, { useCallback, useEffect, useState } from 'react';
import testImage1 from '../../shared/assets/img_1920x1080_rgb.png';
import Jimp from 'jimp';
import { Box, Button, Grid } from '@material-ui/core';
import TestResultDataInfo from '../../components/TestResultDataInfo';
import { getImageData, writeImageDataToCanvas } from '../../utils/image';
import { invertImage } from '../../utils/wasm/invert_loader';

const RGBInvertTest = () => {
    const [imageData, setImageData] = useState(testImage1);
    const [imageDataWasm, setImageDataWasm] = useState(testImage1);
    const [imageJSTestData, setImageJSTestData] = useState({ testName: 'Invert', timeStart: 'N/A', timeEnd: 'N/A' });
    const [imageWASMTestData, setImageWASMTestData] = useState({ testName: 'Invert', timeStart: 'N/A', timeEnd: 'N/A' });

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
        await loadImage.invert();
        const time_end_grayscale = performance.now();

        setImageJSTestData({ testName: 'Invert', timeStart: time_start_grayscale, timeEnd: time_end_grayscale });
        const mime = await loadImage.getBase64Async(Jimp.MIME_PNG);
        setImageData(mime);
    }, [setImageData]);


    const resetTestJS = useCallback(async () => {
        setImageData(testImage1);
    }, []);

    const runTestWasm = useCallback(async () => {
        const data = await getImageData({ url: imageDataWasm });

        const time_start_grayscale = performance.now()
        const wasmData=await invertImage(data.data);
        const time_end_grayscale = performance.now();

        const canvas = document.createElement('canvas');
        setImageDataWasm(writeImageDataToCanvas(canvas, wasmData, data.width, data.height).toDataURL());
        setImageWASMTestData({ testName: 'Invert', timeStart: time_start_grayscale, timeEnd: time_end_grayscale });
    })

    const resetTestWasm = useCallback(async () => {
        setImageDataWasm(testImage1);
    }, []);


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

export default RGBInvertTest
