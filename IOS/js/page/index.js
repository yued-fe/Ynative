'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/requestIndexData';
import {StyleSheet, View, Text, Dimensions,ActivityIndicator,Easing} from 'react-native';
import RankPage from './rank';
import CategoryPage from './category';
import FreePage from './free';
import NewPage from './new';
import FinishPage from './finish';
import WebViewPage from './webview';
import SearchDemoPage from './searchDemo';
import BookStorePage from './bookStore';
import CatDetailPage from './catdetail';
import AnimatedPage from './animated';
import CircleTransition from '../utils/circleTransition';

class IndexPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            animating:true,
            customLeftMargin: 0,
            customTopMargin: 0,
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    首页
                </Text>
                <Text style={styles.instructions} onPress={() => this.goBack()}>
                    回退
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(RankPage,{anim:"floatFromBottom"})}>
                    点我跳转到排行榜(转场1-floatFromBottom)
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(CategoryPage,{anim:"floatFromLeft"})}>
                    点我跳转到分类页(转场2-floatFromLeft)
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(NewPage,{anim:"floatFromRight"})}>
                    点我跳转到新书页（转场3-floatFromRight）
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(FinishPage,{anim:"pushFromLeft"})}>
                    点我跳转到完本页（转场4-pushFromLeft）
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(FreePage,{anim:"pushFromRight"})}>
                    点我跳转到免费页（转场5-pushFromRight）
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(AnimatedPage,{anim:"swipeFromLeft"})}>
                    点我跳转到动画页（转场6-swipeFromLeft)
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(WebViewPage,{title: "起点M站",url: "https://m.qidian.com/",anim:"horizontalSwipeJump"})}>
                    点我跳转到webview页（转场7-horizontalSwipeJump）
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(CatDetailPage,{anim:"verticalUpSwipeJump"})}>
                    点我跳转到二级分类页（转场8-verticalUpSwipeJump）
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(NewPage,{anim:"verticalDownSwipeJump"})}>
                    点我跳转到新书页（转场9-verticalDownSwipeJump）
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(NewPage,{anim:"customPushFromRight"})}>
                    点我跳转到新书页（转场10-customPushFromRight）
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(NewPage,{anim:"animationScaleInRight"})}>
                    点我跳转到新书页（转场11-animationScaleInRight）
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(NewPage,{anim:"animationScaleInRightDown"})}>
                    点我跳转到新书页（转场12-animationScaleInRightDown）
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(NewPage,{anim:"animationScaleInRightUp"})}>
                    点我跳转到新书页（转场13-animationScaleInRightUp）
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(NewPage,{anim:"animationRotateInLeft"})}>
                    点我跳转到新书页（转场14-animationRotateInLeft）
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(NewPage,{anim:"customAnimation"})}>
                    点我跳转到新书页（转场15-customAnimation）
                </Text>
                <Text style={styles.instructions} onPress={() => this.switchPage(NewPage,{anim:"switchMain"})}>
                    点我跳转到新书页（转场16-switchMain）
                </Text>
                <Text style={styles.instructions} onPress={(evt) => this.startCircleTransition(evt,NewPage,{anim:"switchMain"})}>
                    点我跳转到新书页（转场17-circleTransition）
                </Text>
                <CircleTransition
                    ref={(circle) => { this.circleTransition = circle }}
                    color={'orange'}
                    position={'left'}
                    expand
                    customLeftMargin={this.state.customLeftMargin}
                    customTopMargin={this.state.customTopMargin}
                    transitionBuffer={10}
                    duration={1200}
                    easing={Easing.linear}
                />
                <Text style={styles.instructions} onPress={() => this.loadData()}>
                    点我开始请求数据
                </Text>

                {this.props.loading?<ActivityIndicator animating={this.state.animating} style={[styles.centering,{height: 80}]} size="large"/>:null}

                {
                    (this.props.error && !this.props.hasData) ?
                        <Text style={styles.instructions}>请求失败</Text>
                        :
                        ((this.props.hasData) ?
                            <Text style={styles.instructions}>请求结果：{this.props.dataSource.rankBookInfo.hot[0].authorName}</Text>
                            :
                            null
                        )
                }
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

    startCircleTransition(event,component,args){
        let pressLocationX = event.nativeEvent.locationX;
        let pressLocationY = event.nativeEvent.locationY;
        this.setState({
            customLeftMargin: pressLocationX,
            customTopMargin: pressLocationY
        })
        this.circleTransition.start(()=>this.switchPage(component,args));
    }
    goBack () {
        this.props.navigator.pop();
    }

    switchPage(component,args){
        this.props.navigator.push({
            component: component,
            args:args
        });
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
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
});
//把你需要的一些state丢到顶层,组件里直接用this.props调用
const mapStateToProps = (state) => {
    return {
        error: state.indexDataState.error,
        loading: state.indexDataState.loading,
        hasData: state.indexDataState.hasData,
        dataSource: state.indexDataState.dataSource
    };
};
//把action注入组件，就可作为函数使用，不用手动dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
