const React = require('react');
const { ViewPropTypes } = ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    Animated,
    Platform
} = ReactNative;
import theme from '../utils/themeUtil';
import px2dp from '../utils/pxtodpUtil';
import Button from './button';

const DefaultTabBar = React.createClass({
    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        backgroundColor: React.PropTypes.string,
        activeTextColor: React.PropTypes.string,
        inactiveTextColor: React.PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: ViewPropTypes.style,
        renderTab: React.PropTypes.func,
        underlineStyle: ViewPropTypes.style,
    },

    getDefaultProps() {
        return {
            activeTextColor: theme.barTitleColor,
            inactiveTextColor: 'rgba(255,255,255,0.5)',
            backgroundColor: theme.barTintColor
        };
    },

    renderTabOption(name, page) {
    },

    renderTab(name, page, isTabActive, onPressHandler) {
        const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';

        return <Button
            style={this.props.tabWidth ? {width:this.props.tabWidth} : {flex: 1, }}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
        >
            <View style={[styles.tab, this.props.tabStyle, ]}>
                <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
                    {name}
                </Text>
            </View>
        </Button>;
    },

    render() {
        const numberOfTabs = this.props.tabs.length;
        const containerWidth = this.props.tabWidth ?  (this.props.tabWidth * numberOfTabs) : this.props.containerWidth;

        const tabUnderlineStyle = {
            position: 'absolute',
            width: containerWidth / numberOfTabs,
            height: 2,
            backgroundColor: theme.barTitleColor,
            bottom: 0,
        };

        const translateX = this.props.scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  containerWidth / numberOfTabs],
        });
        return (

            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    const renderTab = this.props.renderTab || this.renderTab;
                    return renderTab(name, page, isTabActive, this.props.goToPage);
                })}
                <Animated.View
                    style={[
                        tabUnderlineStyle,
                        {
                            transform: [
                                { translateX },
                            ]
                        },
                        this.props.underlineStyle,
                    ]}
                />
                <View style={styles.more}>
                    <Text style={{color:'#fff'}}>更多</Text>
                </View>
            </View>

        );
    },
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: px2dp(20),
    },
    tabs: {
        height: px2dp(65),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
    more: {
        flex:1,
        height: px2dp(65),
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems:'center',
        paddingTop: px2dp(20),
        marginRight: px2dp(10)
    }
});

module.exports = DefaultTabBar;
