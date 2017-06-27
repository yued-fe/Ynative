'use strict';

import React, { Component, PropTypes } from 'react';
import {
    ListView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    ActivityIndicator,
    Platform,
    InteractionManager,
    ScrollView,
} from 'react-native';
import NavigationBar from 'react-native-navigationbar';
import theme from '../utils/themeUtil';

import WebViewPage from './webview';

import Align from '../components/Align';
import SingleDataComponent from '../components/singleDataComponent';

function encodeObj(obj) {
    if (!obj) {
        return '';
    }

    const params = [];
    const encode = encodeURIComponent;

    Object.keys(obj).forEach((key) => {
        let value = obj[key];

        if (value == null) {
            value = '';
        }

        params.push(`${encode(key)}=${encode(value)}`);
    });

    return params.join('&').replace(/%20/g, '+');
}

class RankDetailPage extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.page = 1;
        this.isLast = true;
        this.books = [];

        this.state = {
            filters: [],
            ds: ds.cloneWithRows([]),
            params: {},
            didMount: false,
            hasError: false,
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            fetch('https://m.readnovel.com/majax/rank/list?type=' + this.props.rankType)
                .then(response => response.json())
                .then((result) => {
                    const ds = this.state.ds;
                    const params = this.state.params;

                    const filters = result.data.filters || [];
                    filters.forEach(d => params[d.key] = d.selectedValue);

                    this.isLast = !!result.data.isLast;
                    this.books = result.data.records || [];
                    this.setState({
                        filters: filters,
                        params: params,
                        ds: ds.cloneWithRows(this.books),
                        didMount: true,
                    });
                })
                .catch((error)=>{
                    this.setState({
                        didMount: true,
                        hasError: true
                    });
                });
        });
    }

    loadBooks() {
        const page = this.page;
        const queryString = encodeObj(Object.assign({ page }, this.state.params));

        fetch('https://m.readnovel.com/majax/rank/list?type=' + this.props.rankType + '&' + queryString)
            .then(response => response.json())
            .then((result) => {
                let books = this.books;
                const ds = this.state.ds;

                if (page > 1) {
                    books = books.concat(result.data.records);
                } else {
                    books = result.data.records;
                }

                this.isLast = !!result.data.isLast;
                this.books = books;
                this.setState({
                    ds: ds.cloneWithRows(this.books),
                });
            })
            .catch((error)=>{
                this.setState({
                    hasError: true
                });
            });
    }

    reloadBooks() {
        this.page = 1;
        this.loadBooks();
    }

    loadMoreBooks() {
        if (!this.isLast) {
            this.page++;
            this.loadBooks();
        }
    }

    render() {
        return(
            <View style={styles.view}>
                <NavigationBar title={this.props.rankName}
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
                        renderHeader={() => this._renderFilters()}
                        renderRow={(book, sectionId, index) => this._renderBook(book, index)}
                        onEndReached={() => this.loadMoreBooks()}
                        onEndReachedThreshold={50}
                        automaticallyAdjustContentInsets={false}
                    />
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

    _renderFilters() {
        return (
            <View>
                {this.state.filters.map(this._renderFilter.bind(this))}
            </View>
        );
    }

    _renderFilter(filter, filterIndex) {
        return (
            <View style={styles.filter} key={filter.key}>
                {filter.items.map((tag, index) => this._renderTag(tag, index, filter.key))}
            </View>
        );
    }

    _renderTag(tag, tagIndex, filterKey) {
        const params = this.state.params;
        const isSelected = tag.value === params[filterKey];
        const onTagClick = () => {
            if (!isSelected) {
                params[filterKey] = tag.value;
                this.setState({ params });
                this.reloadBooks();
            }
        };

        return (
            <TouchableHighlight style={[styles.tag, isSelected ? styles.selectedTag : null]} key={tag.value} onPress={onTagClick} underlayColor="rgba(0,0,0,.05)">
                <Text style={[styles.tagText, isSelected ? styles.selectedTagText : null]}>{tag.text}</Text>
            </TouchableHighlight>
        );
    }

    _renderBook(book, bookIndex) {
        return (
            <View style={styles.item}>
                <View style={styles.order}>
                    <Align h="flex-start">
                        <Text style={styles.orderText}>{+bookIndex + 1}.</Text>
                    </Align>
                </View>
                <View style={styles.book}>
                    <SingleDataComponent
                        item={book}
                        index={bookIndex}
                        frompage="RankDetailPage"
                        navigator={this.props.navigator}
                    />
                </View>
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
});

export default RankDetailPage
