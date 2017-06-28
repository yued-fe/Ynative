import React, { Component, PropTypes } from 'react';
import {
    View,
} from 'react-native';

class Align extends Component {
    propTypes: {
        h: PropTypes.String,
        v: PropTypes.String,
    }

    static defaultProps = {
        h: 'center',
        v: 'center',
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flex: 1, justifyContent: this.props.v, alignItems: this.props.h}}>
                <View>
                    {this.props.children}
                </View>
            </View>
        );
    }
}
export default Align