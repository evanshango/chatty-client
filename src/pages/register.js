import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid";
import AppIcon from '../images/chatty.png';
import Typography from "@material-ui/core/Typography";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
//Redux
import {connect} from 'react-redux';
import {registerUser} from "../redux/actions/userActions";

const styles = theme => ({...theme.styling});

class register extends Component {
    constructor(props) {
        super(props);
        this.state = {handle: '', email: '', password: '', confirmPassword: '', errors: {}}
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.UI.errors) {
            return ({errors: nextProps.UI.errors}) // <- this is setState equivalent
        } else return null;
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            errors: {}
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({loading: true});
        const newUserData = {
            handle: this.state.handle,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        this.props.registerUser(newUserData, this.props.history)
    };

    render() {
        const {classes, UI: {loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt='chatty' style={{maxHeight: '200px'}} className={classes.image}/>
                    <Typography variant='h5' className={classes.pageTitle}>REGISTER</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='handle' name='handle' type='text' label='Handle'
                                   className={classes.textField}
                                   helperText={errors.handle} error={!!errors.handle} value={this.state.handle}
                                   onChange={this.handleChange} fullWidth/>
                        <TextField id='email' name='email' type='email' label='Email' className={classes.textField}
                                   helperText={errors.email} error={!!errors.email} value={this.state.email}
                                   onChange={this.handleChange} fullWidth/>
                        <TextField id='password' name='password' type='password' label='Password'
                                   className={classes.textField} helperText={errors.password} error={!!errors.password}
                                   value={this.state.password} onChange={this.handleChange} fullWidth/>
                        <TextField id='confirmPassword' name='confirmPassword' type='password' label='Confirm Password'
                                   className={classes.textField} helperText={errors.confirmPassword}
                                   error={!!errors.confirmPassword}
                                   value={this.state.confirmPassword} onChange={this.handleChange} fullWidth/>
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>)}
                        <Button type='submit' variant='contained' color='primary' className={classes.button}
                                disabled={loading}>Register
                            {loading && (<CircularProgress className={classes.progress} color='secondary'/>)}
                        </Button>
                        <br/>
                        <small>Already have an account ? Login {' '}
                            <Link to={'/login'} style={{color: 'blue', textDecoration: 'underline'}}>here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

register.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, {registerUser})(withStyles(styles)(register));
