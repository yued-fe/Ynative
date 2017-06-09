'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text,Dimensions,ActivityIndicator, Image, ScrollView,TouchableHighlight} from 'react-native';
import Swiper from 'react-native-swiper';
import CategoryPage from './category';
import CatDetailPage from './catdetail';
import RankPage from './rank';
import SearchPage from './searchDemo';

class BookStorePage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.container}>
                <Swiper style={styles.wrapper} width={'100%'} height={250} loop={true} autoplay={true}>
                    <Image  style={styles.image} source={{uri: 'https://qidian.qpic.cn/qidian_common/349573/ad932201175a77c7f96ed28d0c3f1acf/0'}} />
                    <Image  style={styles.image} source={{uri: 'https://qidian.qpic.cn/qidian_common/349573/ca9c6ea4e5d70f2542e4a0791e82b3cb/0'}} />
                    <Image  style={styles.image} source={{uri: 'https://qidian.qpic.cn/qidian_common/349573/cab2778493c43e33237adff16b62308e/0'}} />
                    <Image  style={styles.image} source={{uri: 'https://qidian.qpic.cn/qidian_common/349573/ad932201175a77c7f96ed28d0c3f1acf/0'}} />                       
                </Swiper>    
                <View style={styles.nav}>
                    <TouchableHighlight onPress={() => this.goRankPage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={38} height={38}  source={require('../res/rank.png')} />
                            <Text style={styles.navText} >排行榜</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.goSearchPage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={38} height={38}  source={require('../res/free.png')} />
                            <Text style={styles.navText} >新书</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.goCatDetailPage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={32} height={40}  source={require('../res/sort.png')} />
                            <Text style={styles.navText} >完本</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.goCategoryPage()}>
                        <View style={styles.iconBox}>
                            <Image style={styles.iconImg} width={32} height={40}  source={require('../res/end.png')} />
                            <Text style={styles.navText} >分类</Text>
                        </View>
                    </TouchableHighlight>
                </View>  
                <View style={styles.title}><Text style={styles.titleText}>热门小说</Text></View>    
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

    goCatDetailPage () {
        this.switchPage(CatDetailPage);
    }

    goRankPage () {
        this.switchPage(RankPage);
    }

    goSearchPage () {
        this.switchPage(SearchPage)
    }

    switchPage(component){
        this.props.navigator.push({
            component: component
        });
    }
}
class BookListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <View style={styles.bookListItem}>
                <Image style={styles.bookCover} source={{uri: 'https://qidian.qpic.cn/qdbimg/349573/c_5282978903343101/150'}} />
                <Text>{this.props.bookName}</Text>
                <Text>{this.props.authorName}</Text>                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex: 1,
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
    bookCover: {
        flex: 1,
        width: 100,
        height: 90
    },
    navText: {
        color: '#333',
        fontSize: 14,        
    },
    bookListItem: { 
        height: 200,
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10, 
        paddingBottom: 10
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
