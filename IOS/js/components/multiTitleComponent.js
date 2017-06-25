import React, {Component,PropTypes} from 'react';
import {StyleSheet,View,Text,Image,TouchableHighlight,Platform} from 'react-native';
import px2dp from '../utils/pxtodpUtil';
import WebViewPage from '../page/webview';
import CatDetailPage from '../page/catdetail';
import RankPage from '../page/rank';
import FreePage from '../page/free';
import FinishPage from '../page/finish';
import NewPage from '../page/new';
import CategoryPage from '../page/category';
import theme from '../utils/themeUtil';

export default class MultiTitleComponent extends Component{

    constructor(props){
        super(props);
    }

    static propTypes = {
        borderColor: PropTypes.string,
        categoryName: PropTypes.string.isRequired,
        hasMoreBtn: PropTypes.bool
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const {categoryName, borderColor, hasMoreBtn, customLeft,moreType,moreParams} = this.props;
        return (
            <View style={styles.titleWrapper}>
                <View style={styles.titleLeft}>
                    {
                        borderColor?
                            borderColor==="blue"?
                                <Image style={styles.titleLeftImg} source={require('../res/blue-l.png')} />
                                :
                                <Image style={styles.titleLeftImg} source={require('../res/red-l.png')} />
                            :
                            null
                    }
                    <Text style={styles.titleInfo}>{categoryName}</Text>
                    {
                        customLeft ?
                            customLeft === "hotfree" ?
                                <Text style={styles.titleLeftText}>人气最高的免费作品</Text>
                                :
                                customLeft === "hotfinish" ?
                                    <Text style={styles.titleLeftText}>一周热销完本书</Text>
                                    :
                                    ""
                            :
                            null
                    }
                </View>
                {
                    hasMoreBtn ?
                        <TouchableHighlight underlayColor={theme.touchableHighlightUnderlayColor} onPress={() => this.goMorePage(this.props.moreType,this.props.moreParams)}>
                            <View style={styles.titleRight}>
                                <Text style={styles.titleRightText}>更多</Text>
                                <Image style={styles.titleRightImg} source={require('../res/icon-arrow-r.png')} />
                            </View>
                        </TouchableHighlight>
                        :
                        null
                }
            </View>
        )
    }

    goMorePage (type,params) {
        if(type === "catdetail"){
            this.switchPage(CatDetailPage,{params:params});
        } else if(type === "rank"){
            this.switchPage(RankPage,{});
        } else if(type === "new"){
           this.switchPage(NewPage,{});
        } else if(type === "free"){
           this.switchPage(FreePage,{});
        } else if(type === "finish"){
           this.switchPage(FinishPage,{});
        }  else if(type === "category"){
           this.switchPage(CategoryPage,{});
        } else {

        }
    }

    switchPage(component,args){
        this.props.navigator.push({
            component: component,
            args:args
        });
    }
}

const styles = StyleSheet.create({
    titleWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: px2dp(28),
        paddingLeft: px2dp(16),
        paddingRight: px2dp(16),
        marginTop: px2dp(16),
    },
    titleLeft:{
        flexDirection: "row"
    },
    titleLeftImg: {
        marginTop: (Platform.OS === 'android' ? px2dp(5) : px2dp(0)),
        marginRight: px2dp(8)
    },
    titleInfo: {
        fontWeight: "400",
        color: "#33373d",
        fontSize: px2dp(16)
    },
    titleLeftText: {
        fontSize: px2dp(13),
        color: "#969ba3",
        marginLeft: px2dp(8),
        marginTop: px2dp(3),
    },
    titleRight: {
        flexDirection: "row"
    },
    titleRightText: {
        marginTop: (Platform.OS === 'android' ? px2dp(0) : px2dp(3)),
        fontSize: px2dp(14),
        color: "#969ba3"
    },
    titleRightImg: {
        marginTop: px2dp(4),
        marginLeft: px2dp(8),
        width:px2dp(7),
        height:px2dp(12)
    }
})
