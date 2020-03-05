import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

const styles = theme => ({
    ...theme.styling,
    commentImage: {
        maxWidth: '100%',
        height: 90,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: '20px'
    }
});

class Comments extends Component {
    render() {
        const {classes, comments} = this.props;
        return (
            <Fragment>
                <Grid container>
                    {comments.map((comment, index) => {
                        const {body, createdAt, userImage, handle} = comment;
                        return (
                            <Fragment key={createdAt}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={2}>
                                            <img src={userImage} alt="comment" className={classes.commentImage}/>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <div className={classes.commentData}>
                                                <Typography variant='h5' component={Link} to={`/users/${handle}`}
                                                            color='primary'>
                                                    {handle}
                                                </Typography>
                                                <Typography variant='body2' color='textSecondary'>
                                                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                                </Typography>
                                                <hr className={classes.invisibleSeparator}/>
                                                <Typography variant='body1'>
                                                    {body}
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {index !== comments.length - 1 && (
                                    <hr className={classes.visibleSeparator}/>
                                )}
                            </Fragment>
                        )
                    })}
                </Grid>
            </Fragment>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
