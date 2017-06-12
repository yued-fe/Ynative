import React, {Component,PropTypes} from 'react';
import {StyleSheet,View,Text,Image} from 'react-native';
import px2dp from '../utils/pxtodpUtil';

export default class MultiTitleComponent extends Component{

    constructor(props){
        super(props);
    }

    static propTypes = {
        borderColor: PropTypes.string,
        categoryName: PropTypes.string.isRequired,
        hasMoreBtn: PropTypes.bool
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const {categoryName, borderColor, hasMoreBtn, customLeft} = this.props;
        return (
            <View style={styles.titleWrapper}>
                <View style={styles.titleLeft}>
                    {borderColor?
                        borderColor==="blue"? <Image style={styles.titleLeftImg} source={require('../res/blue-l.png')} /> : <Image style={styles.titleLeftImg} source={require('../res/red-l.png')} />
                        :
                        null
                    }
                    <Text style={styles.titleInfo}>{categoryName}</Text>
                </View>
                {hasMoreBtn ? <View style={styles.titleRight}><Text style={styles.titleRightText}>更多</Text><Image style={styles.titleRightImg} source={require('../res/icon-arrow-r.png')} /></View> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: px2dp(28),
        paddingLeft: px2dp(16),
        paddingRight: px2dp(16),
        marginTop: px2dp(16),
    },
    titleLeft:{
        flexDirection: "row"
    },
    titleLeftImg: {
        marginTop: px2dp(5),
        marginRight: px2dp(8)
    },
    titleInfo: {
        fontWeight: "400",
        color: "#33373d",
        fontSize: px2dp(16)
    },
    titleRight: {
        flexDirection: "row"
    },
    titleRightText: {
        fontSize: px2dp(14),
        color: "#969ba3"
    },
    titleRightImg: {
        marginTop: px2dp(5),
        marginLeft: px2dp(8)
    }
})