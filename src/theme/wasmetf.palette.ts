import { createTheme } from "@material-ui/core/styles";
import createPalette, {
  PaletteOptions,
} from "@material-ui/core/styles/createPalette";

const paletteOptions: PaletteOptions = {
  primary: {
    main: "#1E88E5",
  },
  secondary: {
    light: "#0066ff",
    main: "#f50057",
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
};
const palette = createPalette(paletteOptions);
export { palette };
