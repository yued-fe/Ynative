import React, {Component,PropTypes} from 'react';
import {StyleSheet,View,Text,Image,TouchableHighlight,Dimensions,Platform,PixelRatio} from 'react-native';
import px2dp from '../utils/pxtodpUtil';
import WebViewPage from '../page/webview';
import theme from '../utils/themeUtil';

export default class SingleDataComponent extends Component{

    constructor(props){
        super(props);
    }

    render() {
        const {item, index} = this.props;
        return(
            <View style={[styles.infowrapper,index!==0?styles.infowrapperborder:""]} key={this.props.index}>
                <TouchableHighlight underlayColor={theme.touchableHighlightUnderlayColor} onPress={() => this.goDetailPage(this.props.item)}>
                    <View style={styles.infoitem}>
                        <Image style={styles.infoimg} source={{uri:"https://qidian.qpic.cn/qdbimg/349573/c_"+this.props.item.bid+"/150"}} />
                        <View style={styles.infoword}>
                            <Text style={styles.infoname}>{this.props.item.bName}</Text>
                            <Text numberOfLines={2} style={styles.infodesc}>{this.props.item.desc}</Text>
                            <View style={styles.infometa}>
                                <View style={styles.infometaleft}>
                                    <Image style={styles.authorimg} source={require('../res/author-avatar.png')} />
                                    <Text style={styles.authorname}>{this.props.item.bAuth}</Text>
                                </View>
                                <View style={styles.infometaright}>
                                    <View style={[styles.infometarightwrap,styles.yellowbg]}>
                                        <Text style={[styles.infometawrap,styles.yellow]}>{this.props.item.cat}</Text>
                                    </View>
                                    <View style={[styles.infometarightwrap,styles.redbg]}>
                                        <Text style={[styles.infometawrap,styles.red]}>{this.props.item.state}</Text>
                                    </View>
                                    <View style={[styles.infometarightwrap,styles.bluebg]}>
                                        <Text style={[styles.infometawrap,styles.blue]}>{this.props.item.cnt}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    goDetailPage (book) {
        //this.switchPage(DetailPage,{bId:book.bId});
        this.props.navigator.push({
            component: WebViewPage,
            args: {
                anim: "customPushFromRight",
                title: book.bName,
                url: `https://m.readnovel.com/book/${book.bid}`,
            },
        });
    }

    switchPage(component,args){
        this.props.navigator.push({
            component: component,
            args:args
        });
    }
}

const styles = StyleSheet.create({
    infowrapper: {
        height:px2dp(120),
        flex:1,
        flexDirection: "row",
        marginLeft: px2dp(16)
    },
    infowrapperborder: {
        borderTopWidth: 2/PixelRatio.get(),
        borderTopColor: "#f0f1f2"
    },
    infoitem: {
        marginTop:px2dp(16),
        marginBottom:px2dp(16),
        flexDirection: "row",
        width: Dimensions.get('window').width - px2dp(32)
    },
    infoimg: {
        width:px2dp(66),
        height:px2dp(88),
        marginRight:px2dp(8)
    },
    infoword: {
        justifyContent: "space-between"
    },
    infoname: {
        fontWeight:"bold",
        fontSize:px2dp(16),
        color:"#000"
    },
    infodesc: {
        color:'#969ba3',
        fontSize:px2dp(14),
        width: Dimensions.get('window').width - px2dp(106)
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
})