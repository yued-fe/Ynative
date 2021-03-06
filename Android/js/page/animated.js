'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions,ScrollView,Animated,Platform,Image} from 'react-native';
import NavigationBar from 'react-native-navigationbar'

class AnimatedPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            opacity: new Animated.Value(1),
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar title="动画"
                       barStyle={styles.navBar}
                       backHidden={false}
                       barTintColor='white'
                       statusbarPadding = {(Platform.OS === 'android' ? false : true)}
                       backFunc={() => {
                           this.props.navigator.pop()
                       }}/>
                <ScrollView
                    onScroll={this._onScroll.bind(this)}>
                        <Animated.View style={[styles.imgwrap,{opacity: this.state.opacity}]}>
                            <Image style={styles.img} source={{uri:"https://img.webnovel.com/bookcover/7141993106000405/600/600.jpg"}} />
                        </Animated.View>
                        <View style={styles.text}>
                            <Text style={{marginTop: 30}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 30}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 30}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 30}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 30}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 30}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 30}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 30}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 30}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 30}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 30}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 10}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 10}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 10}}>啦啦啦啦啦啦啦啦啦啦</Text>
                            <Text style={{marginTop: 10}}>啦啦啦啦啦啦啦啦啦啦</Text>
                        </View>
                </ScrollView>
            </View>
        );
    }

    _onScroll(event){
        var offsetY = event.nativeEvent.contentOffset.y;
        if(offsetY <= 40){
            this.setState({opacity: 1});
        }else{
            var opacity = 40/offsetY;
            this.setState({opacity: opacity});
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    imgwrap: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    img: {
        width:150,
        height:200
    },
    text:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
    }
});
export default AnimatedPage;
