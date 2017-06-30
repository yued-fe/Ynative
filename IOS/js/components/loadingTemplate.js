'use strict';

import React, {Component} from 'react';
import {StyleSheet, View,ActivityIndicator,Text} from 'react-native';

class LoadingTemplate extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let text = this.props.text || "拼命加载中";
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size="large"/>
                <Text style={{marginTop: 10}}>{text}</Text>
                {
                    this.props.contentRender ?
                        this.props.contentRender()
                        :
                        null
                }
            </View>
        );
    }
}
export default LoadingTemplate;
