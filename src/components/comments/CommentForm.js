import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import {comment} from "../../redux/actions/dataActions";
import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    ...theme.styling
});

class CommentForm extends Component {

    state = {body: '', errors: {}};

    handleSubmit = event => {
        event.preventDefault();
        this.props.comment(this.props.screamId, {body: this.state.body})
    };

    // static getDerivedStateFromProps(nextProps) {
    //     if (nextProps.UI.errors) {
    //         return ({ errors: nextProps.UI.errors }) // <- this is setState equivalent
    //     } else return null;
    // }
    componentWillReceiveProps(nextProps){
        if (nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
        if (!nextProps.UI.errors && ! nextProps.UI.loading){
            this.setState({body: '', open: false, errors: {}});
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    render() {
        const {classes, authenticated} = this.props;
        const errors = this.state.errors;

        return authenticated ? (
            <Grid item sm={12} style={{textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField name='body' type='text' label='Comment on scream' error={!!errors.comment}
                               helperText={errors.comment} value={this.state.body} onChange={this.handleChange}
                               fullWidth className={classes.textField}/>
                    <Button type='submit' variant='contained' color='primary' className={classes.button}>
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleSeparator}/>
            </Grid>
        ) : null;
    }
}

CommentForm.propTypes = {
    comment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps, {comment})(withStyles(styles)(CommentForm));
