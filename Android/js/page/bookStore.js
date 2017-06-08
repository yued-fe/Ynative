'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/requestIndexData';
import {StyleSheet, View, Text,Dimensions,ActivityIndicator, Image, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
const Slide = props => {
  return (<View style={styles.slide}>
    <Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{uri: props.uri}} />
    {
      !props.loaded && <View style={styles.loadingView}>
        
      </View>
    }
  </View>)
}

class BookStorePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            imgList: [
                'https://qidian.qpic.cn/qidian_common/349573/ad932201175a77c7f96ed28d0c3f1acf/0',
                'https://qidian.qpic.cn/qidian_common/349573/ca9c6ea4e5d70f2542e4a0791e82b3cb/0',
                'https://qidian.qpic.cn/qidian_common/349573/cab2778493c43e33237adff16b62308e/0',
                'https://qidian.qpic.cn/qidian_common/349573/ad932201175a77c7f96ed28d0c3f1acf/0'
            ],
            loadQueue: [0, 0, 0, 0]
        };
        // this.loadHandle = this.loadHandle.bind(this);
    }

    loadHandle (i) {
        let loadQueue = this.state.loadQueue;
        loadQueue[i] = 1;
        this.setState({
            loadQueue
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Swiper loadMinimal loadMinimalSize={1} style={styles.wrapper} height={240} loop={true} autoplay={true}>
                       <Image  style={styles.image} source={{uri: 'https://qidian.qpic.cn/qidian_common/349573/ad932201175a77c7f96ed28d0c3f1acf/0'}} />
                       <Image  style={styles.image} source={{uri: 'https://qidian.qpic.cn/qidian_common/349573/ca9c6ea4e5d70f2542e4a0791e82b3cb/0'}} />
                       <Image  style={styles.image} source={{uri: 'https://qidian.qpic.cn/qidian_common/349573/cab2778493c43e33237adff16b62308e/0'}} />
                       <Image  style={styles.image} source={{uri: 'https://qidian.qpic.cn/qidian_common/349573/ad932201175a77c7f96ed28d0c3f1acf/0'}} />                       
                </Swiper>    
                <View style={styles.nav}>
                    <View style={styles.iconBox}><Image source={require('../res/rank.png')} /><Text style={styles.navText}>排行榜</Text></View> 
                    <View style={styles.iconBox}><Image source={require('../res/free.png')} /><Text style={styles.navText}>新书</Text></View> 
                    <View style={styles.iconBox}><Image source={require('../res/sort.png')} /><Text style={styles.navText}>完本</Text></View> 
                    <View style={styles.iconBox}><Image source={require('../res/end.png')} /><Text style={styles.navText}>分类</Text></View>                
                </View>      
                <ScrollView horizontal={true} style={styles.bookList}>
                    <View style={styles.iconBox}><Image source={require('../res/rank.png')} /><Text style={styles.navText}>排行榜</Text></View> 
                    <View style={styles.iconBox}><Image source={require('../res/free.png')} /><Text style={styles.navText}>新书</Text></View> 
                    <View style={styles.iconBox}><Image source={require('../res/sort.png')} /><Text style={styles.navText}>完本</Text></View> 
                    <View style={styles.iconBox}><Image source={require('../res/end.png')} /><Text style={styles.navText}>分类</Text></View>
                    <View style={styles.iconBox}><Image source={require('../res/rank.png')} /><Text style={styles.navText}>排行榜</Text></View> 
                    <View style={styles.iconBox}><Image source={require('../res/free.png')} /><Text style={styles.navText}>新书</Text></View> 
                    <View style={styles.iconBox}><Image source={require('../res/sort.png')} /><Text style={styles.navText}>完本</Text></View> 
                    <View style={styles.iconBox}><Image source={require('../res/end.png')} /><Text style={styles.navText}>分类</Text></View>
                    <View style={styles.iconBox}><Image source={require('../res/end.png')} /><Text style={styles.navText}>分类</Text></View>
                    <View style={styles.iconBox}><Image source={require('../res/end.png')} /><Text style={styles.navText}>分类</Text></View>
                    <View style={styles.iconBox}><Image source={require('../res/end.png')} /><Text style={styles.navText}>分类</Text></View>
                    <View style={styles.iconBox}><Image source={require('../res/end.png')} /><Text style={styles.navText}>分类</Text></View>
                    <View style={styles.iconBox}><Image source={require('../res/end.png')} /><Text style={styles.navText}>分类</Text></View>
                    <View style={styles.iconBox}><Image source={require('../res/end.png')} /><Text style={styles.navText}>分类</Text></View>
                    

                </ScrollView>     
            </View>
        );
    }

    loadData () {
        //设置了mapDispatchToProps可以这么调用
        this.props.actions.fetchData();
        /*
            没设置mapDispatchToProps可以这么调用：
                import {fetchData} from '../actions/requestIndexData';
                store.dispatch(fetchData());
        */
    }


}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width,
        flex: 1,
        backgroundColor: 'transparent'
    },
    nav: {
        height: 100,                
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-around',
    },
    iconBox: {
        flex: 1,
        height: 100,
                                
    },
    navText: {
        color: '#333',
    },
    bookList: {
        height: 50,
    },
    loadingView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.5)'
    },

    loadingImage: {
        width: 60,
        height: 60
    }
});
const { width } = Dimensions.get('window');

export default BookStorePage;
