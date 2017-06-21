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

var HistoryWords = [
    { title: '娱乐圈', id: 1 },
    { title: '警示对', id: 2 },
    { title: '种田', id: 3 },
    { title: '天命凤凰', id: 4 },
    { title: '天命凤凰', id: 5 },
    { title: '天命凤凰', id: 6 },
    { title: '天命凤凰', id: 7 },
    { title: '天命凤凰', id: 8 },
];

var HotWords = [
    { title: '娱乐圈', id: 1 },
    { title: '警示对', id: 2 },
    { title: '种田', id: 3 },
    { title: '天命凤凰', id: 4 },
    { title: '天命凤凰', id: 5 },
    { title: '天命凤凰', id: 6 },
    { title: '天命凤凰', id: 7 },
    { title: '天命凤凰', id: 8 },
    { title: '娱乐圈', id: 9 },
    { title: '警示对', id: 10 },
    { title: '种田', id: 11 },
    { title: '天命凤凰', id: 12 },
    { title: '天命凤凰', id: 13 },
    { title: '天命凤凰', id: 14 },
    { title: '天命凤凰', id: 15 },
    { title: '天命凤凰', id: 16 },
];


class SearchModal extends Component {

    timer = null

    state = {
        modalVisible: false,
        showSearchRecommend: false,
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
            <Modal
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={function(){}}
                >
                <View>
                    <TextInput
                        onChangeText={(text) => {
                            this.getSearchRecommend(text);
                        }}
                    />
                    <Button title="取消" onPress={() => {
                        this.setModalVisible(false);
                    }} />
                </View>

                { this.state.showSearchRecommend ?

                    <ScrollView>
                        <View>
                            { this.state.searchRecommend.map((word) => {
                                return <Text key={word.id}>{ word.title }</Text>
                            }) }
                        </View>
                    </ScrollView>
                 :

                    <ScrollView>
                        <View>
                            <Text>大家都在搜</Text>
                            <View style={styles.wordsWrap}>
                                { HotWords.map((word) => {
                                    return <Words title={word.title} key={word.id} />
                                }) }
                            </View>
                        </View>
                        <View>
                            <Text>搜索历史</Text>
                            <Button title="清空" onPress={() => { }} />
                            <View style={styles.wordsWrap}>
                                { HistoryWords.map((word) => {
                                    return <Words title={word.title} key={word.id} />
                                }) }
                            </View>
                        </View>
                    </ScrollView>
                 }

            </Modal>
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
                <Text> { this.props.title } </Text>
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
    wordsWrap: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    word: {

        marginLeft: 5,
        marginRight: 5,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc'
    }
});


export default SearchModal