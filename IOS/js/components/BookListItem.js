'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, Dimensions, ActivityIndicator, Image, ScrollView,TouchableHighlight} from 'react-native';
import px2dp from '../utils/pxtodpUtil';

class BookListItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <View style={styles.bookListItem}>
                <Image style={styles.bookCover} source={{uri: this.props.bookCover}} />
                <Text style={styles.bookName}  numberOfLines={2}>{this.props.bookName}</Text>
                <Text style={styles.authorName}>{this.props.authorName}</Text>
            </View>
        );
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
    },
    authorName: {
        fontSize: px2dp(12),
        lineHeight: px2dp(18),
        color: 'rgb(150, 155, 163)',
    }
});
export default BookListItem;
