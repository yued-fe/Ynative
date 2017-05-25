'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {StyleSheet, View, Text} from 'react-native';

class RankPage extends Component{

    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    排行榜
                </Text>
                <Text style={styles.instructions} onPress={() => this.goBack()}>
                    回到首页
                </Text>
            </View>
        );
    }

    goBack () {
        this.props.navigator.pop();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default RankPage
