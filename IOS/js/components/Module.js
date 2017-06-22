'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View} from 'react-native';
import px2dp from '../utils/pxtodpUtil';

class Module extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <View style={styles.module}>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    module: {
      backgroundColor: '#fff'
    }
});
export default Module;
