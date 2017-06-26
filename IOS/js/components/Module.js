'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import px2dp from '../utils/pxtodpUtil';

class Module extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <View style={styles.module}>
              <Text>dgfgfrh</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    module: {
      backgroundColor: '#fff',
      height: 1000
    }
});
export default Module;
