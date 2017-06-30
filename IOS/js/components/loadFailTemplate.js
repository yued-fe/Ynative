'use strict';

import React, {Component} from 'react';
import {StyleSheet, View,Text} from 'react-native';

class LoadFailTemplate extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let text = this.props.text || "Oooops~, 页面出错了，请检查你的网络或尝试刷新。";
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{marginTop: 10}}>{text}</Text>
            </View>
        );
    }
}
export default LoadFailTemplate;
