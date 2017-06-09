'use strict';

import React, {Component, PropTypes} from 'react';
import {Image,ListView,TouchableHighlight,StyleSheet,View,Text,ScrollView,Dimensions,TouchableNativeFeedback} from 'react-native';
import NavigationBar from 'react-native-navigationbar'

class CatDetailPage extends Component{

    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar title="分类"
                    barStyle={styles.navBar}
                    backHidden={false}
                    barTintColor='white'
                    statusbarPadding = {false}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}/>
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
    header: {
        height:44,
        borderWidth: 1,
        borderColor: "#f0f1f2",
        justifyContent: "center"
    },
    headertext: {
        marginLeft:10,
        color: "#33373d"
    },
    navBar: {
        // height:20
    },
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    content: {
        marginTop: 10,
        marginBottom: 10
    },
    listContainer:{
        flex:1,
        marginBottom: 5,
        marginLeft:10,
        marginRight:10
    },
    green: {
        color: "#65c541"
    },
    blue: {
        color: "#3988ff"
    },
    title: {
        flexDirection: "row",
        marginBottom: 5
    },
    titlefontsize: {
        fontSize: 16,
        color: "#33373d"
    },
    info : {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    infowrapper: {
        height:80,
    },
    infowrapperbc: {
       backgroundColor: "#f6f7f9" 
    },
    infoitem: {
        marginTop:10,
        marginBottom:10,
        flexDirection: "row"
    },
    infoimg: {
        width:40,
        height:60,
        marginRight:5
    },
    infoword: {
        justifyContent: "center"
    },
    infoname: {
        fontWeight:"bold",
        fontSize:16,
        color:"#000"
    },
    infonum: {
        color:"#969ba3"
    }
});

export default CatDetailPage
