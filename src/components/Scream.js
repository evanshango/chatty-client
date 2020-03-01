import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Card} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

const styles = {
    card: {
        display: 'flex',
        marginBottom: 10
    },
    image: {
        minWidth: 200,
        minHeight: 180
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);
        const {classes, scream: {body, createdAt, userImage, handle, screamId, likeCount, commentCount}} = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title='Profile image' className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant='h5' component={Link} to={`/users/${handle}`}
                                color='primary'>{handle}</Typography>
                    <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant='body1'>{body}</Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(Scream);
