import { MuiThemeProvider } from '@material-ui/core';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Pages
import Contest from './pages/Contest';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#2196f3',
      main: '#8e24aa',
      dark: '#6a1b9a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ffea00',
      dark: '#ffff00',
      contrastText: '#000',
    },
    warning: {
      light: '#7986cb',
      main: '#3f51b5',
      dark: '#1a237e',
      contrastText: '#000',
    },
    background: {
      //paper: '#e57373'
      starter: '#e57373'
    },
    
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Contest}/>
          <Route exact path="/Login" component={Login}/>
        </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
