import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        }
    },
    typography: {
        useNextVariants: true
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <Router>
                        <Navbar/>
                        <div className="container">
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/login' component={Login}/>
                                <Route exact path='/register' component={Register}/>
                            </Switch>
                        </div>
                    </Router>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App;
