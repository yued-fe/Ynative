'use strict';

import React, {Component} from 'react';
import {StyleSheet, View,Text} from 'react-native';

class LoadFailTemplate extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let text = this.props.text || "页面加载失败";
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{marginTop: 10}}>{text}</Text>
            </View>
        );
    }
}
export default LoadFailTemplate;
