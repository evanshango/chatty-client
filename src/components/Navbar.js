import React, {Component, Fragment} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from "../util/MyButton";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";
import PostScream from "./PostScream";

class Navbar extends Component {
    render() {
        const {authenticated} = this.props;
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    {authenticated ? (
                        <Fragment>
                            <MyButton tip='Home'><Link to='/'><HomeIcon/></Link></MyButton>
                            <PostScream/>
                            <MyButton tip='Notifications'><Notifications/></MyButton>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color='inherit' component={Link} to='/'>Home</Button>
                            <Button color='inherit' component={Link} to='/login'>Login</Button>
                            <Button color='inherit' component={Link} to='/register'>Register</Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
