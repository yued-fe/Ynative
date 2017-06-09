'use strict';

import React, { Component, PropTypes } from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import NavigationBar from 'react-native-navigationbar';
// import SvgUri from 'react-native-svg-uri';

import WebViewPage from './webview';

class RankPage extends Component {
    constructor(props) {
        super(props);

        const ranks = [
            { name: '热销榜', books: [{}, {}, {}, {}, {}], dataKey: 'hotRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-hotsales.0.1.jpg' },
            { name: '风云榜', books: [{}, {}, {}, {}, {}], dataKey: 'forbesRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-forbes.0.1.jpg' },
            { name: '新书榜', books: [{}, {}, {}, {}, {}], dataKey: 'newRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-newbook.0.1.jpg' },
            { name: '推荐榜', books: [{}, {}, {}, {}, {}], dataKey: 'weekRecomRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-recom.0.1.jpg' },
            { name: '完本榜', books: [{}, {}, {}, {}, {}], dataKey: 'finishRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-finish.0.1.jpg' },
            { name: '打赏榜', books: [{}, {}, {}, {}, {}], dataKey: 'ticketRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-donate.0.1.jpg' },
            { name: '更新榜', books: [{}, {}, {}, {}, {}], dataKey: 'updateRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-update.0.1.jpg' },
            { name: '点击榜', books: [{}, {}, {}, {}, {}], dataKey: 'clickRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-click.0.1.jpg' },
            { name: '收藏榜', books: [{}, {}, {}, {}, {}], dataKey: 'collectRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-collect.0.1.jpg' },
        ];
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.ranks = ranks;

        this.state = {
            ds: ds.cloneWithRows(ranks),
        };
    }

    componentDidMount() {
        fetch('https://m.readnovel.com/majax/rank')
            .then(response => response.json())
            .then((result) => {
                const state = this.state;

                const ranks = this.ranks.map((rank) => {
                    rank.books = result.data[rank.dataKey] || [];
                    return Object.assign({}, rank);
                });

                state.ds = state.ds.cloneWithRows(ranks);

                this.setState(state);
            });
    }

    render() {
        return(
            <View style={styles.view}>
                <NavigationBar title="排行榜"
                    barStyle={styles.nav}
                    backHidden={false}
                    barTintColor='white'
                    statusbarPadding={false}
                    backFunc={() => this.props.navigator.pop()}
                />

                <ListView
                    style={styles.list}
                    dataSource={this.state.ds}
                    renderRow={(rank, sectionId, index) => this._renderRank(rank, index)}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    }

    _renderRank(rank, rankIndex) {
        return (
            <View style={styles.item} key={rankIndex}>
                <View style={styles.rank}>
                    <Image style={styles.cover} source={{uri: rank.cover}} />
                    <Text style={styles.name}>{rank.name}</Text>
                </View>
                <View style={styles.books}>
                    {
                        rank.books.map((book, bookIndex) => {
                            return(
                                <TouchableHighlight onPress={() => this.goDetailPage(book)} key={bookIndex}>
                                    <View style={styles.book}>
                                        <Text style={[styles.bindex, styles['bindex-' + (bookIndex + 1)]]}>{bookIndex + 1}.</Text>
                                        { bookIndex > 0 ? (<View style={styles.bline}></View>) : null }
                                        <Text style={styles.bname} numberOfLines={1}>{book.bName}</Text>
                                    </View>
                                </TouchableHighlight>
                            )
                        })
                    }
                </View>
            </View>
        );
    }

    goDetailPage(book) {
        this.props.navigator.push({
            component: WebViewPage,
            args: {
                title: book.bName,
                url: `https://m.readnovel.com/book/${book.bid}`,
            },
        });
    }
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#f6f7f9',
        flex: 1,
    },
    nav: {},
    list: {
    },
    item: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
    },
    rank: {
        width: 120,
    },
    cover: {
        height: 180,
        flex: 1,
    },
    name: {
        bottom: 76,
        color: '#fff',
        fontSize: 22,
        left: 0,
        lineHeight: 28,
        position: 'absolute',
        right: 1,
        textAlign: 'center',
    },
    books: {
        flex: 1,
    },
    book: {
        flex: 1,
        height: 36,
        justifyContent: 'center',
        paddingLeft: 38,
    },
    bindex: {
        color: '#ccc',
        fontWeight: 'bold',
        position: 'absolute',
        textAlign: 'center',
        width: 38,
    },
    'bindex-1': {
        color: '#ff3f59',
    },
    'bindex-2': {
        color: '#ff7e00',
    },
    'bindex-3': {
        color: '#ffc700',
    },
    bline: {
        backgroundColor: '#f0f1f2',
        height: 1,
        left: 38,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    barrow: {
        height: 18,
        position: 'absolute',
        right: 16,
        width: 12,
    },
    bname: {
        color: '#33373D',
        fontWeight: 'bold',
        marginRight: 30,
    },
});

export default RankPage
