'use strict'
import React, { Component } from 'react'
import SearchTopNav from './SearchTopNav';
import Icon from 'react-native-vector-icons/EvilIcons'
import SearchResult from '../page/searchResult';
import WebViewPage from '../page/webview';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    Modal,
    ScrollView,
    TextInput,
    TouchableHighlight,
    Button
    } from 'react-native'

class SearchModal extends Component {

    state = {
        modalVisible: false,
        showSearchRecommend: false,
        searchRecommend: [ ],
        historyWords: [ ],
        hotWords: [ ]
    }

    constructor (props) {
        super(props)
        this.reset()
    }

    reset() {
        this.getHot()
        this.getHistory()
    }

    getHot() {
        fetch('https://m.readnovel.com/majax/search/auto?kw=')
            .then(response => response.json())
            .then((result) => {
                this.setState({
                    hotWords: result.data.popWords,
                });
            })
            .catch((error) => {
                this.setState({

                });
            })
    }

    getHistory() {
        AsyncStorage.getItem('searchHistory', (err, rawHistory) => {
            if (err || !rawHistory) return;
            var history = JSON.parse(rawHistory);
            this.setState({
                historyWords: history.map((i) => { return { name: i } })
            });
        })
    }

    clearHistory() {
        AsyncStorage.removeItem('searchHistory')
        this.setState({
            historyWords: [] 
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            modalVisible: props.visible
        });
        if (props.visible) {
            this.reset()
            this.setState({
                showSearchRecommend: false,
            })
        }
    }

    getSearchRecommend(text) {

        if (text.length) {
            fetch('https://m.readnovel.com/majax/search/auto?kw='+text)
                .then(response => response.json())
                .then((result) => {
                    this.setState({
                        showSearchRecommend: true,
                        searchRecommend: result.data.bookInfo,
                    });
                })
                .catch((error) => {
                    this.setState({

                    });
                })
        } else {
            this.setState({
                showSearchRecommend: false,
                searchRecommend: []
            })
        }
    }

    closeModal() {
        this.props.onClose();
    }

    goDetailPage(book) {
        this.closeModal();
        this.props.navigator.push({
            component: WebViewPage,
            args: {
                title: book.name,
                url: `https://m.readnovel.com/book/${book.id}`,
            },
        });
    }

    searchWord(text) {
        this.closeModal();
        this.props.navigator.push({
            component: SearchResult,
            args: {
                keyword: text
            }
        });
    }

    render () {
        return (
          <View style={{marginTop: 22}}>
            <Modal
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={function(){}}
                >
                <SearchTopNav
                    defaultSearchValue={this.props.defaultSearchValue}
                    navigator={this.props.navigator}
                    onCancelButtonPress={() => {
                        this.props.onClose();
                    }}
                    onChangeText={(text) => {
                        this.getSearchRecommend(text);
                    }}
                    onSubmitEditing={(event) => {
                        this.closeModal();
                    }}
                 />

                { this.state.showSearchRecommend ?

                    <ScrollView>
                        <View style={{
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}>
                            { this.state.searchRecommend.map((book) => {
                                return <TouchableHighlight key={book.id}
                                    onPress={() => {
                                        this.goDetailPage(book);
                                    }}
                                >
                                  <View
                                    style={{
                                      paddingTop: 5,
                                      paddingBottom: 5,
                                      borderBottomWidth: 1,
                                      borderBottomColor: '#eee',
                                    }}
                                  >
                                    <Icon.Button
                                        size={19}
                                        color="#000"
                                        backgroundColor="#fff"
                                        name="search" 
                                        iconStyle={{
                                            marginRight: 5 
                                        }}
                                        onPress={() => {
                                            this.goDetailPage(book);
                                        }}
                                        >
                                        { book.name }
                                    </Icon.Button>
                                  </View>
                                </TouchableHighlight>
                            }) }
                        </View>
                    </ScrollView>
                 :

                    <ScrollView>
                        <View>
                            <Text style={styles.blockTitle}>大家都在搜</Text>
                            <View style={styles.wordsWrap}>
                                { this.state.hotWords.map((word, index) => {
                                    return <Word title={word.name} key={index} onPress={() => {
                                            this.searchWord(word.name);
                                        }} />
                                }) }
                            </View>
                        </View>
                        { this.state.historyWords.length ?
                        <View>
                            <View>
                                <Text style={styles.blockTitle}>搜索历史</Text>

                                <View
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        bottom: 0,
                                        zIndex: 10,
                                    }}
                                >
                                    <Icon.Button
                                        color="#000"
                                        backgroundColor="#f0f0f0"
                                        name="trash" 
                                        iconStyle={{
                                            marginRight: 0
                                        }}
                                        onPress={() => { this.clearHistory() }}
                                        >
                                        <Text style={{fontSize: 12}}> 清空 </Text>
                                    </Icon.Button>
                                </View>


                            </View>
                            <View style={styles.wordsWrap}>
                                { this.state.historyWords.map((word, index) => {
                                    return <Word title={word.name} key={index} onPress={() => {
                                            this.searchWord(word.name);
                                        }} />
                                }) }
                            </View>
                        </View>
                        :
                        null
                         }
                    </ScrollView>
                 }

            </Modal>
          </View>
        )
    }
}

class Word extends Component {

    constructor (props) {
        super(props)
    }

    render () {
        return (
            <TouchableHighlight style={styles.word} onPress={ this.props.onPress }>
                <Text style={{
                  color: '#999',
                }}> { this.props.title } </Text>
            </TouchableHighlight>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webview: {
        flex: 1
    },
    blockTitle: {
      backgroundColor: '#f0f0f0',
      paddingTop: 20,
      paddingLeft: 15,
      paddingBottom: 7,
      color: '#777',
    },
    wordsWrap: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
    },
    word: {
        marginLeft: 0,
        marginRight: 5,
        marginBottom: 10,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ccc'
    }
});


export default SearchModal
