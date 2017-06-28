'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, Dimensions, ActivityIndicator, Image, ScrollView,TouchableHighlight} from 'react-native';
import px2dp from '../utils/pxtodpUtil';
import theme from '../utils/themeUtil';
import WebViewPage from '../page/webview';

class BookListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <TouchableHighlight underlayColor={theme.touchableHighlightUnderlayColor} onPress={() => this.goDetailPage(this.props)}>
                <View style={styles.bookListItem}>
                    <Image style={styles.bookCover} source={{uri: this.props.bookCover}} />
                    <Text style={styles.bookName}  numberOfLines={2}>{this.props.bookName}</Text>
                    <Text style={styles.authorName}>{this.props.authorName}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    goDetailPage (book) {
        //this.switchPage(DetailPage,{bId:book.bId});
        this.props.navigator.push({
            component: WebViewPage,
            args: {
                title: book.bookName,
                url: `https://m.readnovel.com/book/${book.bookId}`,
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
    bookListItem: {
        height: 200,
        paddingTop: px2dp(12),
        paddingLeft: px2dp(8),
        paddingRight: px2dp(8),
        paddingBottom: px2dp(8)
    },
    bookCover: {
        width: px2dp(66),
        height: px2dp(88)
    },
    bookName: {
        width: px2dp(66),
        flexWrap: 'wrap',
        fontSize: px2dp(13),
        lineHeight: px2dp(18),
        color: 'rgb(51, 55, 61)',
        marginTop: px2dp(8)
    },
    authorName: {
        fontSize: px2dp(12),
        lineHeight: px2dp(18),
        color: 'rgb(150, 155, 163)',
    }
});
export default BookListItem;
