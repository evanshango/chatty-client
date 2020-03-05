import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from '@material-ui/icons/Close'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import {getScream} from "../redux/actions/dataActions";
import MyButton from "../util/MyButton";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import LikeButton from "./LikeButton";
import ChatIcon from "@material-ui/icons/Chat";

const styles = theme => ({
    ...theme.styling,
    closeButton: {
        position: 'absolute',
        left: '91%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    dialogContent: {
        padding: 20
    },
    profileImage: {
        maxWidth: 150,
        height: 150,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    spinnerDiv: {
        textAlign: 'center',
        margin: 50
    }
});

class ScreamDialog extends Component {

    state = {open: false};

    handleOpen = () => {
        this.setState({open: true});
        this.props.getScream(this.props.screamId);
    };

    handleClose = () => {
        this.setState({open: false})
    };


    render() {
        const {
            classes, scream: {screamId, body, createdAt, likeCount, commentCount, userImage, handle},
            UI: {loading}
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container>
                <Grid item sm={4}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color='primary' variant='h5' to={`/users/${handle}`}>
                        @{handle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body2' color='textSecondary'>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body1'>
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary'/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid>
            </Grid>
        );

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Expand scream' tipClassName={classes.expandButton}>
                    <UnfoldMore color='primary'/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

ScreamDialog.propType = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));
