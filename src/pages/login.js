import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid";
import AppIcon from '../images/chatty.png';
import Typography from "@material-ui/core/Typography";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {Link} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({...theme.styling});

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', loading: false, errors: {}}
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({loading: true});
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post('/login', userData).then(res => {
            this.setState({loading: false});
            localStorage.setItem('token', `Bearer ${res.data.token}`);
            this.props.history.push('/');
        }).catch(err => {
            this.setState({errors: err.response.data, loading: false})
        })
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            errors: {}
        })
    };

    render() {
        const {classes} = this.props;
        const {errors, loading} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt='chatty' style={{maxHeight: '200px'}} className={classes.image}/>
                    <Typography variant='h5' className={classes.pageTitle}>LOGIN</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='email' name='email' type='email' label='Email' className={classes.textField}
                                   helperText={errors.email} error={!!errors.email} value={this.state.email}
                                   onChange={this.handleChange} fullWidth/>
                        <TextField id='password' name='password' type='password' label='Password'
                                   className={classes.textField} helperText={errors.password} error={!!errors.password}
                                   value={this.state.password} onChange={this.handleChange} fullWidth/>
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>)}
                        <Button type='submit' variant='contained' color='primary' className={classes.button}
                                disabled={loading}>Login
                            {loading && (<CircularProgress className={classes.progress} color='secondary'/>)}
                        </Button>
                        <br/>
                        <small>Don't have an account ? Register {' '}
                            <Link to={'/register'} style={{color: 'blue', textDecoration: 'underline'}}>here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(login);
