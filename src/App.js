import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import home from "./pages/home";
import login from "./pages/login";
import register from "./pages/register";
import Navbar from "./components/Navbar";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar/>
                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={home}/>
                            <Route exact path='/login' component={login}/>
                            <Route exact path='/register' component={register}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
