import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import * as axios from "axios";
import Scream from "../components/Scream";
import Profile from "../components/Profile";

class Home extends Component {

    state = {
        screams: null
    };

    componentDidMount() {
        axios.get('/screams').then(res => {
            this.setState({
                screams: res.data
            })
        }).catch(err => console.log(err));
    }

    render() {
        let recentScreams = this.state.screams ? (
            this.state.screams.map(scream => <Scream scream={scream} key={scream.screamId}/>)
        ) : <p>Loading...</p>;
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreams}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        );
    }
}

export default Home;
