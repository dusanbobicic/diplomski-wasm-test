import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ClientSideTests, Contact, Home, ServerSideTests } from './views';
import { Footer, Header } from './components';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { Box } from '@material-ui/core';



function App() {
  useEffect(() => {
    (async function () {
      window.GrayscaleModule = await GrayscaleModuleWASM();
      window.InvertImageModule = await InvertModuleWASM();
      window.MathModule = await MathModuleWASM();
    })();

    return () => { 
      window.GrayscaleModule = {};
      window.InvertImageModule = {};
      window.MathModule = {}; 
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Box m={1}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/client-side" component={ClientSideTests} />
              <Route path="/contact" component={Contact} />
            </Switch>
          </Box>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
