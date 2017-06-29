'use strict';

import React, { Component, PropTypes } from 'react';
import {
    ListView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
    ActivityIndicator,
    Platform,
    Dimensions,
    PixelRatio,
    InteractionManager,
    ScrollView,
} from 'react-native';
import px2dp from '../utils/pxtodpUtil';
import NavigationBar from 'react-native-navigationbar';
import theme from '../utils/themeUtil';

import WebViewPage from './webview';
import MultiTitleComponent from '../components/multiTitleComponent';
import BookListH from '../components/BookListH';
import BookStorePage from './bookStore';

import Align from '../components/Align';
import SingleDataComponent from '../components/singleDataComponent';


class BookDetailPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: true,
            searchModalVisible: false,
        }
    }
    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
             this.getBookInfo(this.props.bookId)
        });
       
    }

    getBookInfo(bookId) {
        fetch('https://m.readnovel.com/majax/book/getBookInfo?bookId=' + bookId)
            .then(response => response.json())
            .then((result) => {
                let ds = result.data;
                this.data = result.data;
                this.setState({
                    loading:false,
                    data: result.data,
                    bookName:this.data.bookInfo.bookName,
                    updTime:this.data.bookInfo.updTime,
                    updChapterName:this.data.bookInfo.updChapterName,
                    author:this.data.bookInfo.author,
                    chanName:this.data.bookInfo.chanName,
                    subCateName:this.data.bookInfo.subCateName,
                    wordsCnt:this.data.bookInfo.wordsCnt,
                    bookStatus:this.data.bookInfo.bookStatus,
                    lastupdateChapterId:this.data.bookInfo.lastUpdateChapterId,
                    firstChapterId:this.data.bookInfo.firstChapterId,
                    desc:this.data.bookInfo.desc,
                    hashAuthroRelated:this.data.authorOtherBooks.length>0 ? true : false
                });
            })
            .catch((error) => {
                this.setState({

                });
            })
    }

    goBookStorePage(){
        this.props.navigator.push({
            component: BookStorePage
        });
    }
    goCategoryPage(startChapterId){
        this.props.navigator.push({
            component: WebViewPage,
            args: {
                url: `https://m.readnovel.com/book/${this.props.bookId}/` + startChapterId,
            },
        });
    }
    goChapterPage(chapterId){
        this.props.navigator.push({
            component: WebViewPage,
            args: {
                url: `https://m.readnovel.com/book/${this.props.bookId}/` + chapterId,
            },
        });
    }

    render() {
        return(
            <View style={styles.view}>
                <NavigationBar title={this.state.bookName}
                    barTintColor={theme.barTintColor}
                    titleColor={theme.barTitleColor}
                    backColor={theme.barTitleColor}
                    statusbarPadding={(Platform.OS === 'android' ? false : true)}
                    actionName = "首页"
                    actionTextColor = {theme.barTitleColor}
                    actionFunc = {this.goBookStorePage.bind(this)}
                    backFunc={() => this.props.navigator.pop()}
                />
            
            {!this.state.loading ?
        <ScrollView>
        <View style={styles.infowrapper}>
            <View>
                <TouchableHighlight underlayColor={theme.touchableHighlightUnderlayColor}>
                    <View style={styles.infoitem}>
                        <Image style={styles.infoimg} source={{uri:"https://qidian.qpic.cn/qdbimg/349573/c_"+this.props.bookId+"/150"}} />
                        <View >
                            <Text style={styles.infoname}>{this.state.bookName}</Text>
                            <Text style={[styles.authorname,styles.headermeta]}>{this.state.author}</Text>
                            <Text style={[styles.infocat,styles.headermeta]}>{this.state.chanName}/{this.state.subCateName}</Text>
                            <Text style={[styles.infocat,styles.headermeta]}>{this.state.wordsCnt} | {this.state.bookStatus}</Text>
                            
                            <View style={styles.infometa}>
                                <View style={styles.infometaleft}>
                                </View>
                            </View>
                        </View>

                    </View>
                </TouchableHighlight>

                <View style={styles.headerButtonWrapper} >
                    <TouchableHighlight onPress={() => this.goChapterPage(this.state.firstChapterId)} style={[styles.headerButton,styles.activeButton]} underlayColor="rgba(0,0,0,.5)">
                        <Text style={[styles.buttonText,styles.activeButtonText]}>免费阅读</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.headerButton} underlayColor="rgba(0,0,0,.5)">
                        <Text style={styles.buttonText}>加入书架</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.headerButton} underlayColor="rgba(0,0,0,.5)">
                        <Text style={styles.buttonText}>VIP订阅</Text>
                    </TouchableHighlight>
                </View>

                    <View style={styles.infodescwrapper}  >
                        <Text numberOfLines={4} style={styles.infodesc}>{this.state.desc}</Text>
                    </View>
                    <TouchableHighlight onPress={() => this.goCategoryPage(this.state.lastupdateChapterId)} underlayColor={theme.touchableHighlightUnderlayColor}>
                    <View style={styles.entryCatWrapper}  >
                        <Text style={[styles.entryCatText,styles.entryCatTitle]} >目录:</Text>
                        <Text numberOfLines={1} style={[styles.entrycat,styles.entryCatText]}>{this.state.updTime}·连载至{this.state.updChapterName}</Text>
                    </View>
                    </TouchableHighlight>
                </View>
            </View>
                {
                this.state.hashAuthroRelated ?
                <View style={[styles.module, styles.addedModule]}>
                      <MultiTitleComponent
                          categoryName = '作者的其他作品'
                          borderColor= "black"
                          hasMoreBtn= { false }
                          moreType={"rank"}
                          navigator = {this.props.navigator}
                      />
                      {
                          !this.state.loading ?
                          <BookListH books={this.state.data.authorOtherBooks} navigator = {this.props.navigator}>

                          </BookListH>
                          :
                          null
                      }
                </View>
                :
                null
                }

                <View style={[styles.module, styles.addedModule]}>
                  <MultiTitleComponent
                      categoryName = '同类推荐'
                      borderColor= "black"
                      hasMoreBtn= { false }
                      moreType={"rank"}
                      navigator = {this.props.navigator}
                  />
                  {
                      !this.state.loading ?
                      <BookListH books={this.state.data.catRec} navigator = {this.props.navigator}>

                      </BookListH>
                      :
                      null
                  }
                </View>
                </ScrollView>
                    :
                    this.state.hasError ?
                        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{marginTop: 10}}>页面错误</Text>
                        </View>
                        :
                        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                            <ActivityIndicator size="large"/>
                            <Text style={{marginTop: 10}}>拼命加载中</Text>
                        </View>
                }
    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#f6f7f9',
        flex: 1,
    },
    nav: {},
    headerButtonWrapper:{
        flexDirection: 'row',
    },
    headerButton:{
        flex: 1,
        alignItems: 'center',
        borderWidth:1,
        borderColor: '#efefef',
        borderRadius: 3,
        marginBottom: 9,
        marginTop: 9,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height:px2dp(30),
        backgroundColor:"#fff",
    },
    activeButton: {
        backgroundColor:"#ff3955",
    },
    buttonText: {
        textAlign: 'center',
        color: '#33373d',
        fontSize: 14,
        lineHeight: 25,
    },
    activeButtonText: {
        color: '#fff',
    },
    entryCatWrapper:{
        flexDirection: 'row',
        paddingTop:px2dp(10),
        paddingBottom:px2dp(0),
    },

    entryCatText:{
        flex:1,
        color:"#969ba3"
    },
    entryCatTitle:{
        color:"#33373d",
        fontSize:px2dp(18),
        fontWeight:"bold"
    },
    filter: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 16,
    },
    tag: {
        borderColor: 'transparent',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 9,
        marginTop: 9,
        marginRight: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    selectedTag: {
        borderColor: '#ff3955',
    },
    tagText: {
        color: '#969ba3',
        fontSize: 13,
        lineHeight: 20,
    },
    selectedTagText: {
        color: '#ff3955',
    },
    list: {
    },
    item: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
    },
    order: {
        marginLeft: 16,
        width: 34,
    },
    orderText: {
        fontFamily: 'DIN Alternate',
        fontSize: 16,
        fontWeight: 'bold',
    },
    book: {
        marginLeft: -16,
        flex: 1,
    },
    module: {
        backgroundColor: '#fff',
        marginBottom: px2dp(12)
    },
    addedModule: {
        height: px2dp(216),
    },
    infowrapper: {
        flexDirection: "row",
        padding:px2dp(16),
        flex:1,
        backgroundColor:"#fff",
        marginBottom:px2dp(20)
    },
    infowrapperborder: {
        borderTopWidth: 2/PixelRatio.get(),
        borderTopColor: "#f0f1f2"
    },
    infoitem: {
        marginTop:px2dp(16),
        marginBottom:px2dp(16),
        flexDirection: "row"
    },
    infoimg: {
        width:px2dp(90),
        height:px2dp(120),
        marginRight:px2dp(8)
    },
    infoword: {
        justifyContent: "space-between",
        width: Dimensions.get('window').width - px2dp(106)
    },
    rankwidth: {
        width: Dimensions.get('window').width - px2dp(138)
    },
    headermeta:{
        color:"#33373d",
        fontSize:px2dp(14),
        lineHeight:px2dp(24)
    },
    infoname: {
        fontWeight:"bold",
        fontSize:px2dp(16),
        marginTop:px2dp(18),
        color:"#000"
    },
    infodescwrapper:{
        borderTopWidth: 2/PixelRatio.get(),
        borderBottomWidth: 2/PixelRatio.get(),
        borderTopColor: "#f0f1f2",
        borderBottomColor: "#f0f1f2",
        paddingTop:px2dp(10),
        paddingBottom:px2dp(10),
    },
    infodesc: {
        color:'#969ba3',
        fontSize:px2dp(14),
        lineHeight:px2dp(24)
    },
    infometa: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    infometaleft: {
        flexDirection: "row"
    },
    authorimg: {
        width:px2dp(12),
        height:px2dp(12),
        marginTop:px2dp(3),
        marginRight:px2dp(3),
    },
    authorname: {
        color:'#969ba3',
        fontSize:px2dp(13),
        marginTop: (Platform.OS === 'android' ? px2dp(0) : px2dp(3))
    },
    infometaright: {
        flexDirection: "row"
    },
    infometarightwrap: {
        borderWidth: 1,
        justifyContent: "center",
        height: px2dp(15),
        marginTop:px2dp(3),
        marginRight:px2dp(3),
    },
    yellowbg: {
        borderColor:'#ffa100'
    },
    redbg: {
        borderColor:'#ff3955'
    },
    bluebg: {
        borderColor:'#4284ee'
    },
    yellow: {
        color:'#ffa100'
    },
    red: {
        color:'#ff3955'
    },
    blue: {
        color:'#4284ee'
    },
    infometawrap:{
        fontSize: px2dp(8),
        padding: px2dp(2)
    }
});

export default BookDetailPage
