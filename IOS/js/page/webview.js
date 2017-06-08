'use strict'
import React, { Component } from 'react'
import { StyleSheet,Text,View, WebView,ActivityIndicator} from 'react-native'
import NavigationBar from 'react-native-navigationbar'
import BackPageComponent from '../components/backPageComponent';
class WebViewPage extends BackPageComponent {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <View style={styles.container}>
                <NavigationBar title={this.props.title}
                    backHidden={false}
                    barTintColor='white'
                    statusbarPadding = {false}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}/>
                <WebView
                    style={styles.webview}
                    ref={(ref)=>{this.webView = ref}}
                    source={{uri:this.props.url}}
                    renderLoading={this._renderLoading.bind(this)}
                    renderError={this._renderError.bind(this)}
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                />
            </View>
        )
    }

    _renderLoading(){
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size="large"/>
                <Text style={{marginTop: 10}}>7.0+的系统，确认把开发者选项里的多进程WebView关闭</Text>
            </View>
        );
    }

    _renderError(){
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Text>Oooops~, 出错了, 重新刷新下吧～</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webview: {
        flex: 1
    } 
});


export default WebViewPage