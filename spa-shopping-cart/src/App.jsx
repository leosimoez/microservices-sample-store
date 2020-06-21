import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { orange,indigo } from '@material-ui/core/colors';
import './App.css';
import Routes from './routes';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: orange[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  // typography: {
  //   // Use the system font instead of the default Roboto font.
  //   fontFamily: [
  //     '"Lato"',
  //     'sans-serif'
  //   ].join(',')
  // }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
