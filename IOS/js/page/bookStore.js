'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, Dimensions, ActivityIndicator, Image, ScrollView,TouchableHighlight} from 'react-native';
import px2dp from '../utils/pxtodpUtil';
import Swiper from 'react-native-swiper';
import CategoryPage from './category';
import FreePage from './free';
import NewPage from './new';
import FinishPage from './finish';
import RankPage from './rank';
import BookListH from '../components/BookListH';
import NavigationBar from 'react-native-navigationbar';
import MultiTitleComponent from '../components/multiTitleComponent';
import SearchModal from '../components/SearchModal';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/EvilIcons'
import theme from '../utils/themeUtil';


class BookStorePage extends Component{
    constructor(props){
        super(props);

        this.state = {
            loading: true,
            defaultSearchValue: '新婚无爱，替罪前妻',
            searchModalVisible: false,
        }
    }
    componentWillMount() {
        fetch('https://app.readnovel.com/ajax/book/getBookStoreInfo')
            .then(response => response.json())
            .then((result) => {
                this.setState({
                    data:  result.data,
                    loading: false
                });
            })
            .catch((error) => {
                this.setState({

                });
            })
    }
    render(){
        let swiperimgs = [];
        if(!this.state.loading) {
            let adTop = this.state.data.adInfo.adTop;
            for (var i in adTop) {
                var img = (<Image style={styles.image} height={px2dp(110)} resizeMode={'stretch'} key={i} source={{uri: adTop[i].adImgUrl}} />)
                swiperimgs.push(img);
            }
        }
        return(
            <View style={styles.container}>
                <NavigationBar
                    title="书城"
                    titleColor={theme.barTitleColor}
                    backIconHidden={true}
                    barTintColor={theme.barTintColor}
                    />
                <Swiper style={[styles.wrapper, styles.module]} width={Dimensions.get('window').width} height={px2dp(110)} loop={true} autoplay={true}>
                    {swiperimgs}
                </Swiper>

                <View style={styles.searchButtonWrap} >
                  <TouchableHighlight onPress={() => {
                      this.setState({
                        searchModalVisible: true
                      });
                    }} >
                    <Text style={styles.searchButton}> 

                        <Icon style={{
                            marginRight: 30
                         }} 
                        size={18}
                        color="#999"
                        name="search" />
                        
                        { this.state.defaultSearchValue }

                    </Text>
                  </TouchableHighlight>
                </View>
                <SearchModal 
                    defaultSearchValue={this.state.defaultSearchValue}
                    navigator={this.props.navigator}
                    visible={this.state.searchModalVisible}
                    onClose={() => {
                        this.setState({
                            searchModalVisible: false
                        })
                    }}
                     />

                <View style={[styles.nav, styles.module]}>
                    <TouchableHighlight underlayColor={theme.touchableHighlightUnderlayColor} onPress={() => this.goRankPage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={px2dp(27)} height={px2dp(24)}  source={require('../res/rank.png')} />
                            <Text style={styles.navText} >排行榜</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={theme.touchableHighlightUnderlayColor} onPress={() => this.goFreePage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={px2dp(24)} height={px2dp(24)}  source={require('../res/free.png')} />
                            <Text style={styles.navText} >免费</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={theme.touchableHighlightUnderlayColor} onPress={() => this.goNewPage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={px2dp(19)} height={px2dp(24)}  source={require('../res/newbook.png')} />
                            <Text style={styles.navText} >新书</Text>

                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={theme.touchableHighlightUnderlayColor} onPress={() => this.goFinishPage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={px2dp(18)} height={px2dp(26)}  source={require('../res/end.png')} />
                            <Text style={styles.navText} >完本</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={theme.touchableHighlightUnderlayColor} onPress={() => this.goCategoryPage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={px2dp(24)} height={px2dp(24)}  source={require('../res/sort.png')} />
                            <Text style={styles.navText} >分类</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={[styles.module, styles.hotModule]}>
                  <MultiTitleComponent
                      categoryName = '热门小说'
                      borderColor= "red"
                      hasMoreBtn= { false }
                  />
                  {
                      !this.state.loading ?
                      <BookListH books={this.state.data.hotBookInfo}>

                      </BookListH>
                      :
                      <Text>464556</Text>
                  }
                </View>

                <View style={[styles.module, styles.hotModule]}>
                  <MultiTitleComponent
                      categoryName = '排行榜'
                      borderColor= "red"
                      hasMoreBtn= { true }
                      moreType={"rank"}
                      navigator = {this.props.navigator}
                  />
                  {
                      !this.state.loading ?
                      <BookListH books={this.state.data.hotBookInfo}>

                      </BookListH>
                      :
                      <Text>464556</Text>
                  }
                </View>
            </View>
        );
    }

    goCategoryPage () {
        this.switchPage(CategoryPage);
    }

    goRankPage () {
        this.switchPage(RankPage);
    }

    goFreePage () {
        this.switchPage(FreePage);
    }

    goNewPage () {
        this.switchPage(NewPage);
    }

    goFinishPage () {
        this.switchPage(FinishPage);
    }

    switchPage(component){
        this.props.navigator.push({
            component: component
        });
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'red'
    },
    container: {
        backgroundColor: '#f6f7f9'
    },
    module: {
        backgroundColor: '#fff',
        marginBottom: px2dp(12)
    },
    hotModule: {
        height: px2dp(216)
    },
    slide: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        backgroundColor: 'transparent',
    },
    navBar: {

    },
    nav: {
        height: px2dp(82),
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    iconBox: {
        height: px2dp(58),
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconImg: {

    },
    navText: {
        color: 'rgb(51, 55, 61)',
        fontSize: px2dp(12),
        lineHeight: px2dp(18)
    },
    title: {
        flexDirection:'row',
    },
    titleText: {
        fontSize: 16,
        color: "#33373d",
        borderLeftWidth: 1,
        borderLeftColor: '#ff3955',
        paddingLeft: 10,
        marginLeft: 10
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
    },
    searchButtonWrap: {
        backgroundColor: '#fff',
        paddingTop: 5,
        paddingBottom: 5,
    },
    searchButton: {
        color: "#999",
        fontSize: 14,
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },

});
const { width } = Dimensions.get('window');

export default BookStorePage;
