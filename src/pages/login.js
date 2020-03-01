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
import color from "@material-ui/core/colors/red";

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        marginTop: 20
    },
    textField: {
        marginTop: 10
    },
    pageTitle: {
        marginBottom: 20
    },
    button: {
        marginTop: 20
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    }
};

class Login extends Component {
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
            this.props.history.push('/');
        }).catch(err => {
            this.setState({errors: err.response.data, loading: false})
        })
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
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
                    <Typography variant='h4' className={classes.pageTitle}>LOGIN</Typography>
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
                        <Button type='submit' variant='contained' color='primary'
                                className={classes.button}>Login
                        </Button>
                        <br/>
                        <small>don't have an account ? register
                            <Link to={'/register'} style={{color: 'blue'}}>here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
