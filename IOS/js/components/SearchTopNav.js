
'use strict'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/EvilIcons'
import SearchResult from '../page/searchResult';
import theme from '../utils/themeUtil';
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

class SearchTopNav extends Component {

    state = {
        keyword: ''
    }

    constructor (props) {
        super(props)
        this.state = {
            keyword: props.value 
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            modalVisible: props.visible
        });
    }

    searchWord(text) {

        this.props.navigator.push({
            component: SearchResult,
            args: {
                keyword: text
            }
        });
    }

    render () {
        return (
            <View style={{
                marginTop: 22,
                paddingTop: 6,
                paddingBottom: 6,
                paddingLeft: 15,
                paddingRight: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
                flexDirection: 'row',
                backgroundColor: '#fff',
                }}>
                <Icon style={{
                    position: 'absolute',
                    backgroundColor: '#f0f0f0',
                    top: 13,
                    left: 25,
                    zIndex: 2
                }} 
                size={22}
                color="#999"
                name="search" />
                <TextInput
                    style={{
                        height: 32,
                        width: 300,
                        paddingLeft: 32,
                        paddingRight: 20,
                        borderRadius: 3,
                        fontSize: 14,
                        backgroundColor: '#f0f0f0',
                        color: '#333'
                    }}
                    defaultValue={this.props.value}
                    placeholder={this.props.defaultSearchValue}
                    clearButtonMode='while-editing'
                    onChangeText={(text) => {
                        this.props.onChangeText(text);
                    }}
                    onSubmitEditing={(event) => {
                        this.props.onSubmitEditing(event);
                        this.searchWord(event.nativeEvent.text);
                    }}
                />
                <TouchableHighlight underlayColor={theme.touchableHighlightUnderlayColor} onPress={() => {
                    this.setState({
                        keyword: ''
                    })
                    this.props.onCancelButtonPress();
                }}>
                    <Text style={{
                    paddingTop: 9,
                    paddingLeft: 14,
                    }}>取消</Text>
                </TouchableHighlight>
            </View>
        )
    }
}


export default SearchTopNav
