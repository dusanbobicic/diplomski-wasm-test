import { overrides } from "./wasmetf.overrides";
import { palette } from "./wasmetf.palette";
import { createTheme, ThemeOptions } from '@material-ui/core/styles';
import { themeDefaultProps } from './wasmetf.defaultProps';

const wasmEtfТheme:ThemeOptions= {
    overrides:overrides,
    palette:palette,
    props:themeDefaultProps,
};
export const theme=createTheme(wasmEtfТheme);
