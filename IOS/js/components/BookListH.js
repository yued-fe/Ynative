'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import px2dp from '../utils/pxtodpUtil';
import BookListItem from '../components/BookListItem';


class BookListH extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var books = this.props.books;
        var bookListItems = []
        for (var i = 0;i < books.length;i++) {
            var bookListItem = (<BookListItem bookCover={'https://qidian.qpic.cn/qdbimg/349573/c_' + books[i].bookId + '/150'} bookName={books[i].bookName} authorName={books[i].authorName}></BookListItem>);
            bookListItems.push(bookListItem);
        }
        return(
          <ScrollView horizontal={true} style={[styles.bookList]}>
              {bookListItems}
          </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    bookList: {
        height: px2dp(50),
        paddingLeft: px2dp(8)
    },
});
export default BookListH;
