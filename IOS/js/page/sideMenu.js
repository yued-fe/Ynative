'use strict';

import React, { Component} from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Platform,
    InteractionManager,
    Dimensions
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import NavigationBar from 'react-native-navigationbar';
import theme from '../utils/themeUtil';

const window = Dimensions.get('window');

class SideMenuPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedItem: 'About',
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen, });
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {

        });
    }

    onMenuItemSelected = (item) => {
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    }

    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;
        return(
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}>
                <View style={styles.container}>
                    <NavigationBar
                        title="侧边栏"
                        titleColor={theme.barTitleColor}
                        backIconHidden={true}
                        barTintColor={theme.barTintColor}
                    />
                    <View style={styles.wrapper}>
                        <TouchableOpacity
                            onPress={this.toggle.bind(this)}
                        >
                            <View style={styles.button}>
                                {this.state.isOpen ? <Text>当前状态:打开</Text> : <Text>当前状态:关闭</Text>}
                            </View>
                            <Text>当前选项：{this.state.selectedItem}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SideMenu>
        );
    }
}

class Menu extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        onItemSelected: React.PropTypes.func.isRequired,
    };

    render() {
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri:'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png'}}/>
                    <Text style={styles.name}>Jack</Text>
                </View>

                <Text
                    onPress={() => this.props.onItemSelected('About')}
                    style={styles.item}>
                    About
                </Text>

                <Text
                    onPress={() => this.props.onItemSelected('Contacts')}
                    style={styles.item}>
                    Contacts
                </Text>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.containerBackgroundColor
    },
    wrapper: {
        justifyContent:'center',
        alignItems:'center'
    },
    button: {
        marginTop:200
    },
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'gray',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
});

export default SideMenuPage
