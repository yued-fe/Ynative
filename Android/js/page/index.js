'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/requestIndexData';
import {StyleSheet, View, Text, Dimensions,ActivityIndicator} from 'react-native';
import RankPage from './rank';
import CategoryPage from './category';
import WebViewPage from './webview';
import SearchDemoPage from './searchDemo';
import BookStorePage from './bookStore';

class IndexPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            animating:true
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    首页
                </Text>

                <Text style={styles.instructions} onPress={() => this.goRankPage()}>
                    点我跳转到排行榜
                </Text>
                <Text style={styles.instructions} onPress={() => this.goCategoryPage()}>
                    点我跳转到分类页
                </Text>
                <Text style={styles.instructions} onPress={() => this.goWebviewPage()}>
                    点我跳转到webview页
                </Text>
                <Text style={styles.instructions} onPress={() => this.goSearchDemoPage()}>
                    点我跳转到搜索页
                </Text>
                <Text style={styles.instructions} onPress={() => this.gobookStore()}>
                    点我跳转到书城页
                </Text>
                <Text style={styles.instructions} onPress={() => this.loadData()}>
                    点我开始请求数据
                </Text>

                {this.props.loading?<ActivityIndicator animating={this.state.animating} style={[styles.centering,{height: 80}]} size="large"/>:null}

                {(this.props.error && !this.props.hasData) ?
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

    goRankPage () {
        this.switchPage(RankPage);
    }
    gobookStore () {
        this.switchPage(BookStorePage);
    }

    goCategoryPage () {
        this.switchPage(CategoryPage);
    }

    goWebviewPage () {
        this.props.navigator.push({
            component: WebViewPage,
            args: {title: "起点M站",url: "http://m.qidian.com/"}
        });
    }
    goSearchDemoPage () {
        this.switchPage(SearchDemoPage);
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

    switchPage(component){
        this.props.navigator.push({
            component: component
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
