import React from 'react';
import PropTypes from 'prop-types';
import WindowVirtualScroll from './WindowVirtualScroll';

function FoldableWindowVirtualScroll(props) {
    const { enableFold, foldChildren } = props;
    const [fold, toggleFold] = React.useState(enableFold);

    return <WindowVirtualScroll {...props} {...{ fold, toggleFold, foldChildren }} />;
}

FoldableWindowVirtualScroll.propTypes = {
    enableFold: PropTypes.bool.isRequired,
    foldChildren: PropTypes.func.isRequired
};


export default FoldableWindowVirtualScroll;
