'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, ActivityIndicator, Image, ScrollView,TouchableHighlight,TouchableOpacity} from 'react-native';
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
import SingleDataComponent from '../components/singleDataComponent';
import WebViewPage from '../page/webview';
import BookStoreLocalData from '../persistence/bookStoreLocalData';
import BookDetailPage from './bookDetail';

class BookStorePage extends Component{
    constructor(props){
        super(props);

        this.state = {
            loading: true,
            defaultSearchValue: '新婚无爱，替罪前妻',
            searchModalVisible: false,
        }

        this.KEY = 'YWQDBOOKSTORE';
    }
    componentWillMount() {
        //删除
        //storage.remove({key: this.KEY});
        //设置sync方法
        storage.sync = this.fetchData;
        //读取
        storage.load({
            key: this.KEY,

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            syncInBackground: false,

            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法
            this.setState({
                data:  ret,
                loading: false
            });
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            //warn可以在底部显示
            //console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
            this.fetchData();
        })
        // let localDataAction = new BookStoreLocalData();
        // //localDataAction.remove();
        // localDataAction.fetchLocalData().then((localData) => {
        //     this.setState({
        //         data:  localData,
        //         loading: false
        //     });
        // }, ()=>{
        //     fetch('https://m.readnovel.com/majax/index/index')
        //         .then(response => response.json())
        //         .then((result) => {
        //             this.setState({
        //                 data:  result.data,
        //                 loading: false
        //             });
        //             localDataAction.save(result.data);
        //         })
        //         .catch((error) => {
        //             this.setState({
        //
        //             });
        //         })
        // });
    }

    fetchData() {
        fetch('https://m.readnovel.com/majax/index/index')
        .then(response => response.json())
        .then((result) => {
            this.setState({
                data:  result.data,
                loading: false
            });
            //保存
            storage.save({
                key: this.KEY,  // 注意:请不要在key中使用_下划线符号!
                data: result.data,
                // 如果不指定过期时间，则会使用defaultExpires参数
                // 如果设为null，则永不过期
                //1个小时
                expires: 1000 * 3600
            });
        })
        .catch((error) => {
            this.setState({
                hasError: true,
                loading: false
            });
        })
    }

    render(){
        let swiperimgs = [];
        if(!this.state.loading) {
            let adTop = this.state.data.topAd;
            for (var i in adTop) {
                var img = (<TouchableHighlight key={i} underlayColor={theme.touchableHighlightUnderlayColor} onPress={() => this.goDetailPage(adTop[i])}><Image style={styles.image} height={px2dp(110)} resizeMode={'stretch'} key={i} source={{uri: 'https:'+adTop[i].picUrl}} /></TouchableHighlight>)
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
                <ScrollView style={{marginBottom:50}}>
                <Swiper style={[styles.wrapper, styles.module]} width={Dimensions.get('window').width} height={px2dp(110)} loop={true} autoplay={true}>
                    {swiperimgs}
                </Swiper>

                <View style={styles.searchButtonWrap} >
                    <Icon.Button
                        size={19}
                        color="#999"
                        backgroundColor="#fff"
                        name="search" 
                        iconStyle={{
                            marginRight: 5 
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            this.setState({
                                searchModalVisible: true
                            });
                        }}
                        >
                        { this.state.defaultSearchValue }
                    </Icon.Button>
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
                      <BookListH books={this.state.data.hotTop} navigator = {this.props.navigator}>

                      </BookListH>
                      :
                      null
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
                      <BookListH books={this.state.data.hotRank} navigator = {this.props.navigator}>

                      </BookListH>
                      :
                      null
                  }
                </View>
                <View style={[styles.module]}>
                    <MultiTitleComponent
                        categoryName = '新书抢鲜'
                        borderColor= "red"
                        hasMoreBtn= { true }
                        moreType={"new"}
                        navigator = {this.props.navigator}
                    />
                    {
                        !this.state.loading ?
                            this.state.data.newSell.map((item, index) => {
                                return <SingleDataComponent
                                    item = {item}
                                    index = {index}
                                    key = {index}
                                    navigator = {this.props.navigator}
                                />
                            })
                        :
                        null
                    }
                </View>
                <View style={[styles.module]}>
                    <MultiTitleComponent
                        categoryName = '人气完本'
                        borderColor= "red"
                        hasMoreBtn= { true }
                        moreType={"finish"}
                        navigator = {this.props.navigator}
                    />
                    {
                        !this.state.loading ?
                            this.state.data.finishRank.map((item, index) => {
                                return <SingleDataComponent
                                    item = {item}
                                    index = {index}
                                    key = {index}
                                    navigator = {this.props.navigator}
                                />
                            })
                            :
                            null
                    }
                </View>
                </ScrollView>
            </View>
        );
    }
    goDetailPage (book) {
        this.switchPage(BookDetailPage,{bookId:book.bid});
        // this.props.navigator.push({
        //     component: WebViewPage,
        //     args: {
        //         title: book.bName,
        //         url: 'https://'+book.url,
        //     },
        // });
    }

    goCategoryPage () {
        this.switchPage(CategoryPage,{});
    }

    goRankPage () {
        this.switchPage(RankPage,{});
    }

    goFreePage () {
        this.switchPage(FreePage,{});
    }

    goNewPage () {
        this.switchPage(NewPage,{});
    }

    goFinishPage () {
        this.switchPage(FinishPage,{});
    }

    switchPage(component,args){
        this.props.navigator.push({
            component: component,
            args:args
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
        height: px2dp(216),
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
        // marginTop: 15,
        marginBottom: -10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
    },

});
const { width } = Dimensions.get('window');

export default BookStorePage;
