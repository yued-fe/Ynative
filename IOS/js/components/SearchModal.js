'use strict'
import React, { Component } from 'react'
import {
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

    timer = null

    state = {
        modalVisible: false,
        showSearchRecommend: false,
        historyWords: [
            { name: '娱乐圈' },
            { name: '警示对' },
            { name: '种田' },
            { name: '天命凤凰' },
        ],
        hotWords: [
            { name: '娱乐圈' },
            { name: '警示对' },
            { name: '种田' },
        ]
    }

    constructor (props) {
        super(props)
    }

    componentWillReceiveProps(props) {
        this.setState({
            modalVisible: props.visible
        });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    getSearchRecommend(text) {
        clearTimeout(this.timer);

        if (text.length) {
            this.timer = setTimeout(() => {
                this.setState({
                    showSearchRecommend: true,
                    searchRecommend: [
                        { title: '天命凤凰', id: 15 },
                        { title: '天命凤凰', id: 16 },
                    ]
                })
            }, 2000)
        } else {
            this.setState({
                showSearchRecommend: false,
                searchRecommend: []
            })
        }
    }

    render () {
        return (
          <View style={{marginTop: 22}}>
            <Modal
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={function(){}}
                >
                <View style={{
                  marginTop: 22,
                  paddingTop: 6,
                  paddingBottom: 6,
                  paddingLeft: 15,
                  paddingRight: 15,
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                 }}>
                    <TextInput
                        style={{
                          height: 32,
                          width: 300,
                          paddingLeft: 20,
                          paddingRight: 20,
                          backgroundColor: '#f0f0f0',
                          color: '#777'
                        }}
                        onChangeText={(text) => {
                            this.getSearchRecommend(text);
                        }}
                    />
                    <TouchableHighlight onPress={() => {
                      this.setState({
                        modalVisible: false
                      })
                    }}>
                      <Text style={{
                        paddingTop: 9,
                        paddingLeft: 14,
                      }}>取消</Text>
                    </TouchableHighlight>
                </View>

                { this.state.showSearchRecommend ?

                    <ScrollView>
                        <View style={{
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}>
                            { this.state.searchRecommend.map((word) => {
                                return <TouchableHighlight key={word.id}>
                                  <View
                                    style={{
                                      paddingTop: 10,
                                      paddingBottom: 10,
                                      borderBottomWidth: 1,
                                      borderBottomColor: '#eee',
                                    }}
                                  >
                                  <Text>{ word.title }</Text>
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
                                    return <Words title={word.name} key={index} />
                                }) }
                            </View>
                        </View>
                        <View>
                            <Text style={styles.blockTitle}>搜索历史</Text>
                            <TouchableHighlight>
                              <Text>清空</Text>
                            </TouchableHighlight>
                            <View style={styles.wordsWrap}>
                                { this.state.historyWords.map((word, index) => {
                                    return <Words title={word.name} key={index} />
                                }) }
                            </View>
                        </View>
                    </ScrollView>
                 }

            </Modal>
          </View>
        )
    }
}

class Words extends Component {

    constructor (props) {
        super(props)
    }

    render () {
        return (
            <TouchableHighlight style={styles.word} onPress={() => {

            }}>
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
