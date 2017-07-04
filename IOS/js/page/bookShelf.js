'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ScrollView,TouchableHighlight,InteractionManager,StatusBar,Platform} from 'react-native';
import NavigationBar from 'react-native-navigationbar'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import px2dp from '../utils/pxtodpUtil';
import theme from '../utils/themeUtil';
import CustomTabBar from '../components/customTabBar';
import FreePage from './free';
import NewPage from './new';

class BookShelfPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }
    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={theme.barTintColor} barStyle="light-content" />
                <ScrollableTabView
                    renderTabBar={() => <CustomTabBar tabWidth={80} />}
                >
                    <Text tabLabel='作品'>我是作品页</Text>
                    <Text tabLabel='书单'>我是书单页</Text>
                </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.containerBackgroundColor
    }
});

export default BookShelfPage;
