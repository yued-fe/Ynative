'use strict';

import React, { Component, PropTypes } from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    ActivityIndicator,
    Platform,
    InteractionManager
} from 'react-native';
import NavigationBar from 'react-native-navigationbar';
import theme from '../utils/themeUtil';
import RankDetailPage from './rank-detail.js';
import WebViewPage from './webview';
import LoadingTemplate from '../components/loadingTemplate';
import LoadFailTemplate from '../components/loadFailTemplate';

class RankPage extends Component {
    constructor(props) {
        super(props);

        const ranks = [
            { name: '热销榜', books: [{}, {}, {}, {}, {}], type: 0, dataKey: 'hotRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-hotsales.0.1.jpg' },
            { name: '风云榜', books: [{}, {}, {}, {}, {}], type: 7, dataKey: 'forbesRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-forbes.0.1.jpg' },
            { name: '新书榜', books: [{}, {}, {}, {}, {}], type: 1, dataKey: 'newRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-newbook.0.1.jpg' },
            { name: '推荐榜', books: [{}, {}, {}, {}, {}], type: 5, dataKey: 'weekRecomRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-recom.0.1.jpg' },
            { name: '完本榜', books: [{}, {}, {}, {}, {}], type: 2, dataKey: 'finishRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-finish.0.1.jpg' },
            { name: '打赏榜', books: [{}, {}, {}, {}, {}], type: 8, dataKey: 'ticketRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-donate.0.1.jpg' },
            { name: '更新榜', books: [{}, {}, {}, {}, {}], type: 6, dataKey: 'updateRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-update.0.1.jpg' },
            { name: '点击榜', books: [{}, {}, {}, {}, {}], type: 3, dataKey: 'clickRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-click.0.1.jpg' },
            { name: '收藏榜', books: [{}, {}, {}, {}, {}], type: 9, dataKey: 'collectRank', cover: 'https://qidian.gtimg.com/readnovelm/img/rank/rank-bg-collect.0.1.jpg' },
        ];
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.ranks = ranks;

        this.state = {
            ds: ds.cloneWithRows(ranks),
            didMount: false,
            hasError: false
        };
        this.KEY = 'YWQDRANK';
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            storage.sync = this.fetchData;
            storage.load({
                key: this.KEY,
                syncInBackground: false
            }).then(result => {
                const state = this.state;

                const ranks = this.ranks.map((rank) => {
                    rank.books = result.data[rank.dataKey] || [];
                    return Object.assign({}, rank);
                });

                state.ds = state.ds.cloneWithRows(ranks);

                this.setState(state);
                this.setState({
                    didMount: true
                });
            }).catch(err => {
                this.fetchData();
            })
        });
    }

    fetchData() {
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
                this.setState({
                    didMount: true
                });
                storage.save({
                    key: this.KEY,
                    data: result,
                    expires: 1000 * 3600
                });
            })
            .catch((error)=>{
                this.setState({
                    didMount: false,
                    hasError: true
                });
            });
    }

    render() {
        return(
            <View style={styles.view}>
                <NavigationBar title="排行榜"
                    barTintColor={theme.barTintColor}
                    titleColor={theme.barTitleColor}
                    backColor={theme.barTitleColor}
                    statusbarPadding={(Platform.OS === 'android' ? false : true)}
                    backFunc={() => this.props.navigator.pop()}
                />
                {this.state.didMount ?
                    <ListView
                        style={styles.list}
                        dataSource={this.state.ds}
                        renderRow={(rank, sectionId, index) => this._renderRank(rank, index)}
                        automaticallyAdjustContentInsets={false}
                    />
                    :
                    this.state.hasError ?
                        <LoadFailTemplate/>
                        :
                        <LoadingTemplate/>
                }
            </View>
        );
    }

    _renderRank(rank, rankIndex) {
        return (
            <View style={styles.item} key={rankIndex}>
                <TouchableHighlight onPress={() => this.goRankDetailPage(rank)} underlayColor="rgba(0,0,0,.05)">
                    <View style={styles.rankCover}>
                        <Image style={styles.rankCoverBg} source={{uri: rank.cover}} />
                        <Text style={styles.rankCoverName}>{rank.name}</Text>
                        <View>
                            <Image style={styles.rankCoverArrow} source={require('../res/rank-arrow.png')} />
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.books}>
                    {
                        rank.books.map((book, bookIndex) => {
                            return(
                                <TouchableHighlight onPress={() => this.goBookDetailPage(book)} key={bookIndex} underlayColor="rgba(0,0,0,.05)">
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

    goRankDetailPage(rank) {
        this.props.navigator.push({
            component: RankDetailPage,
            args: {
                rankName: rank.name,
                rankType: rank.type,
            },
        });
    }

    goBookDetailPage(book) {
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
    rankCover: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 180,
        width: 120,
    },
    rankCoverBg: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    rankCoverName: {
        color: '#fff',
        fontSize: 22,
        lineHeight: 28,
        marginTop: 20,
    },
    rankCoverArrow: {
        height: 24,
        marginTop: 40,
        width: 24,
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
