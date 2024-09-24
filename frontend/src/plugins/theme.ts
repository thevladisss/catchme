import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#ed2c2c',
      dark: '#a61f1f',
      light: "#f48080"
    },
    secondary: {
      main: '#3b3535',
      dark: "#3b3535",
      light: ""
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
