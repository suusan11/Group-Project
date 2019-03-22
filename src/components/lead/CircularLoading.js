import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    }
});


function CircularIndeterminate(props) {
    const { classes, isLoading } = props;

    const loadingPosition = {
        display: isLoading ? 'inline-block' : 'none',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }

    const iconSize = {
        width: '60px',
        height: '60px'
    }

    console.log(isLoading);

    return (
        <div style={loadingPosition}>
            <CircularProgress className={classes.progress} style={iconSize} />
        </div>
    );
}

CircularIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);

