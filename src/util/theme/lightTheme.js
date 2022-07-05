import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#D8B05A",
      main: "#D0A039",
      dark: "#B68A2B",
    },
    secondary: {
      light: "#B377CF",
      main: "#A359C5",
      dark: "#9040B5",
      contrastText: "#000",
    },
  },
});

export default lightTheme;
