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
import BookListItem from '../components/BookListItem'
import MultiTitleComponent from '../components/multiTitleComponent';
import Module from '../components/Module';


class BookStorePage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.container}>
                <Swiper style={styles.wrapper} width={Dimensions.get('window').width} height={250} loop={true} autoplay={true}>
                    <Image  style={styles.image} source={{uri: 'https://qidian.qpic.cn/qidian_common/349573/ad932201175a77c7f96ed28d0c3f1acf/0'}} />
                    <Image  style={styles.image} source={{uri: 'https://qidian.qpic.cn/qidian_common/349573/ca9c6ea4e5d70f2542e4a0791e82b3cb/0'}} />
                    <Image  style={styles.image} source={{uri: 'https://qidian.qpic.cn/qidian_common/349573/cab2778493c43e33237adff16b62308e/0'}} />
                    <Image  style={styles.image} source={{uri: 'https://qidian.qpic.cn/qidian_common/349573/ad932201175a77c7f96ed28d0c3f1acf/0'}} />
                </Swiper>
                <View style={styles.nav}>
                    <TouchableHighlight onPress={() => this.goRankPage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={px2dp(27)} height={px2dp(24)}  source={require('../res/rank.png')} />
                            <Text style={styles.navText} >排行榜</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.goFreePage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={px2dp(24)} height={px2dp(24)}  source={require('../res/free.png')} />
                            <Text style={styles.navText} >免费</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.goNewPage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={px2dp(19)} height={px2dp(24)}  source={require('../res/newbook.png')} />
                            <Text style={styles.navText} >新书</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.goFinishPage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={px2dp(18)} height={px2dp(26)}  source={require('../res/end.png')} />
                            <Text style={styles.navText} >完本</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.goCategoryPage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={px2dp(24)} height={px2dp(24)}  source={require('../res/sort.png')} />
                            <Text style={styles.navText} >分类</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <MultiTitleComponent
                    categoryName = '热门小说'
                    borderColor= "red"
                    hasMoreBtn= { true }
                />
                <ScrollView horizontal={true} style={styles.bookList}>
                    <BookListItem bookCover='https://qidian.qpic.cn/qdbimg/349573/c_5282978903343101/150' bookName='婚途有坑' authorName='豆丁丁'></BookListItem>
                    <BookListItem bookCover='https://qidian.qpic.cn/qdbimg/349573/c_5282978903343101/150' bookName='婚途有坑' authorName='豆丁丁'></BookListItem>
                    <BookListItem bookCover='https://qidian.qpic.cn/qdbimg/349573/c_5282978903343101/150' bookName='婚途有坑' authorName='豆丁丁'></BookListItem>
                    <BookListItem bookCover='https://qidian.qpic.cn/qdbimg/349573/c_5282978903343101/150' bookName='婚途有坑' authorName='豆丁丁'></BookListItem>
                    <BookListItem bookCover='https://qidian.qpic.cn/qdbimg/349573/c_5282978903343101/150' bookName='婚途有坑' authorName='豆丁丁'></BookListItem>
                    <BookListItem bookCover='https://qidian.qpic.cn/qdbimg/349573/c_5282978903343101/150' bookName='婚途有坑' authorName='豆丁丁'></BookListItem>
                    <BookListItem bookCover='https://qidian.qpic.cn/qdbimg/349573/c_5282978903343101/150' bookName='婚途有坑' authorName='豆丁丁'></BookListItem>
                    <BookListItem bookCover='https://qidian.qpic.cn/qdbimg/349573/c_5282978903343101/150' bookName='婚途有坑' authorName='豆丁丁'></BookListItem>
                    <BookListItem bookCover='https://qidian.qpic.cn/qdbimg/349573/c_5282978903343101/150' bookName='婚途有坑' authorName='豆丁丁'></BookListItem>
                    <BookListItem bookCover='https://qidian.qpic.cn/qdbimg/349573/c_5282978903343101/150' bookName='婚途有坑' authorName='豆丁丁'></BookListItem>
                </ScrollView>
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
        backgroundColor: '#f6f7f9'
    },
    container: {
        flex: 1,
        backgroundColor: '#f6f7f9'
    },

    slide: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        backgroundColor: 'transparent',
        width: '100%',
        height: 250
    },
    nav: {
        height: 60,
        flexDirection:'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 10,
    },
    iconBox: {
        height: 60,
        alignItems: 'center',
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
