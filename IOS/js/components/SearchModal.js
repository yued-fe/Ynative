'use strict'
import React, { Component } from 'react'
import SearchTopNav from './SearchTopNav';
import Icon from 'react-native-vector-icons/EvilIcons'
import SearchResult from '../page/searchResult';
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
        this.reset()
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

    goDetailPage(id) {
        this.closeModal();
        this.props.navigator.push({
            component: SearchResult,
            args: {
                keyword: text
            }
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
                            { this.state.searchRecommend.map((word) => {
                                return <TouchableHighlight key={word.id}
                                    onPress={() => {
                                        this.goDetailPage(word.id);
                                    }}
                                >
                                  <View
                                    style={{
                                      paddingTop: 10,
                                      paddingBottom: 10,
                                      borderBottomWidth: 1,
                                      borderBottomColor: '#eee',
                                    }}
                                  >
                                  <Text>
                                        <Icon style={{
                                            backgroundColor: '#fff',
                                        }} 
                                        size={22}
                                        color="#999"
                                        name="search" />
                                      { word.name }
                                  </Text>
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
                                <TouchableHighlight 
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 15,
                                        zIndex: 2,
                                    }}
                                    onPress={() => { this.clearHistory() }}
                                    >
                                <Text style={{
                                }}>
                                    <Icon style={{
                                        backgroundColor: '#f0f0f0',
                                    }} 
                                    size={22}
                                    color="#000"
                                    name="trash" />
                                    清空
                                </Text>
                                </TouchableHighlight>

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
