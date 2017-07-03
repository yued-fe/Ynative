'use strict';

import React, {Component} from 'react';
import {StyleSheet, Platform, View, Text, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import BookStorePage from './bookStore';
import CategoryPage from './category';
import FreePage from './free';
import FinishPage from './finish';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../utils/pxtodpUtil';
import theme from '../utils/themeUtil';

class BottomBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home'
        };
    }

    componentWillMount(){
        if(Platform.OS === 'ios') {
            Icon.getImageSource('ios-home-outline', 100, theme.bottomBarItemColor).then((source) => this.setState({homeNormal: source}));
            Icon.getImageSource('ios-home-outline', 100, theme.bottomBarItemSelectedColor).then((source) => this.setState({homeSelected: source}));
            Icon.getImageSource('ios-compass-outline', 100, theme.bottomBarItemColor).then((source) => this.setState({compassNormal: source}));
            Icon.getImageSource('ios-compass-outline', 100, theme.bottomBarItemSelectedColor).then((source) => this.setState({compassSelected: source}));
            Icon.getImageSource('ios-list-box-outline', 100, theme.bottomBarItemColor).then((source) => this.setState({moreNormal: source}));
            Icon.getImageSource('ios-list-box-outline', 100, theme.bottomBarItemSelectedColor).then((source) => this.setState({moreSelected: source}));
            Icon.getImageSource('ios-cube-outline', 100, theme.bottomBarItemColor).then((source) => this.setState({collectionNormal: source}));
            Icon.getImageSource('ios-cube-outline', 100, theme.bottomBarItemSelectedColor).then((source) => this.setState({collectionSelected: source}));
        }
    }

    render(){
        return(
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={[styles.tabBarStyle, {backgroundColor: theme.bottomBarItemBgColor}]}
                sceneStyle={{ paddingBottom: styles.tabBarStyle.height }}
                >
                {this._renderItem(BookStorePage, 'home', '书城', this.state.homeNormal, this.state.homeSelected)}
                {this._renderItem(FreePage, 'discovery', '免费', this.state.compassNormal, this.state.compassSelected)}
                {this._renderItem(CategoryPage, 'collection', '分类', this.state.collectionNormal, this.state.collectionSelected)}
                {this._renderItem(FinishPage, 'more', '完本', this.state.moreNormal, this.state.moreSelected)}
            </TabNavigator>
        );
    }

    _renderItem(Component, tab, tabName, normalIcon, selectedIcon){
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab === tab}
                title={tabName}
                selectedTitleStyle={{color:theme.bottomBarItemSelectedColor}}
                renderIcon={() => <Image style={styles.tabBarItemIcon} source={normalIcon} />}
                renderSelectedIcon={() => <Image style={[styles.tabBarItemIcon]} source={selectedIcon} />}
                onPress={() => this.setState({ selectedTab: tab })}>
                {<Component navigator={this.props.navigator}/>}
            </TabNavigator.Item>
        );
    }

}

const styles = {
    tabBarItemIcon: {
        width: px2dp(20),
        height: px2dp(20)
    },
    tabBarStyle: {
        height: px2dp(45),
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? px2dp(6) : px2dp(3)
    }
}

export default BottomBar;