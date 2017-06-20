'use strict'
import React, { Component } from 'react'
import { StyleSheet,Text,View, Modal, TextInput, TouchableHighlight, Button} from 'react-native'
import NavigationBar from 'react-native-navigationbar'
import SearchModal from '../components/SearchModal';

class SearchDemoPage extends Component {

    state = {
        modalVisible: false,
    }

    constructor (props) {
        super(props)
    }


    render () {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => {
                    this.setState({ modalVisible: true });
                }}>
                    <Text>touch to search</Text>
                </TouchableHighlight>

                <SearchModal visible={this.state.modalVisible} />

            </View>
        )
    }

    _showModal() {

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webview: {
        flex: 1
    } 
});


export default SearchDemoPage