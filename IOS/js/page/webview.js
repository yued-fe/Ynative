'use strict'
import React, { Component,PropTypes } from 'react'
import { StyleSheet,Text,View, WebView,ActivityIndicator,Platform, Alert, Linking, Clipboard, Modal, PanResponder, Animated,TouchableOpacity,Dimensions,PixelRatio,InteractionManager} from 'react-native'
import NavigationBar from 'react-native-navigationbar'
import BackPageComponent from '../components/backPageComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import px2dp from '../utils/pxtodpUtil';
import ShareUtil from '../utils/shareUtil';
import Toast from 'react-native-root-toast';
import theme from '../utils/themeUtil';

class WebViewPage extends BackPageComponent {
    constructor (props) {
        super(props)
        this.state = {
            didMount: false,
            showMoreContent: false,
            bottomInfoBarBottomValue: new Animated.Value(0),
        };
        this.bottomIconNames = ['ios-arrow-back-outline',
            'ios-arrow-forward-outline',
            'ios-refresh-outline'
        ];
        this.bottomIconSize = [px2dp(25),px2dp(25),px2dp(32)];
        this.moveYThreshold = 5;
        this.animationFlag = true;
    }

    componentWillMount(){
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let y = gestureState.dy;
                if(y > this.moveYThreshold && this.animationFlag) { //drag down
                    if (this.state.bottomInfoBarBottomValue === px2dp(0)) return;
                    this.animationFlag = false;
                    Animated.timing(this.state.bottomInfoBarBottomValue, {
                        toValue: 0,
                        duration: 300
                    }).start(() => this.animationFlag = true);
                }
                if(y < -this.moveYThreshold && this.animationFlag) {  //drag up
                    if (this.state.bottomInfoBarBottomValue === px2dp(-45)) return;
                    this.animationFlag = false;
                    Animated.timing(this.state.bottomInfoBarBottomValue, {
                        toValue: px2dp(-45),
                        duration: 300
                    }).start(() => this.animationFlag = true);
                }
            }
        });
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                didMount: true
            });
        });
    }

    render () {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.props.title}
                    barTintColor = {theme.barTintColor}
                    statusbarPadding = {(Platform.OS === 'android' ? false : true)}
                    rightBtnIcon = "more"
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}
                    actionName = "更多"
                    actionFunc = {this._btnOnPressCallback.bind(this, 7)}
                />
                <Modal
                    transparent={true}
                    visible={this.state.showMoreContent}
                    onRequestClose={this._btnOnPressCallback.bind(this, 7)}>
                    <View style={[styles.moreContentContainerBackground, {backgroundColor: 'rgba(0,0,0,0.1)'}]}>
                        <View style={styles.moreContentContainer}>
                            {this._renderModalItem(0, 'ios-paper-outline', '查看完整标题')}
                            {this._renderModalItem(4, 'ios-clipboard-outline', '复制链接')}
                            {this._renderModalItem(5, 'ios-open-outline', '在浏览器中打开')}
                            {this._renderModalItem(6, 'ios-share-outline', '分享此内容')}
                            {this._renderModalItem(7, 'ios-close-circle-outline', '关闭')}
                        </View>
                    </View>
                </Modal>
                <View style={styles.contentContainer} {...this._panResponder.panHandlers}>
                    {
                        this.state.didMount ?
                            <WebView
                                style={styles.webview}
                                ref={(ref) => {
                                    this.webView = ref
                                }}
                                source={{uri: this.props.url}}
                                renderLoading={this._renderLoading.bind(this)}
                                renderError={this._renderError.bind(this)}
                                startInLoadingState={true}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                            />
                            :
                            null
                    }
                </View>
                <Animated.View style={[styles.bottomInfoBar, {bottom: this.state.bottomInfoBarBottomValue}]}>
                    {
                        this.bottomIconNames.map((item, i)=>{
                            return(
                                <View key={i} style={{flex: 1, alignItems: 'center'}}>
                                    <TouchableOpacity
                                        onPress={this._btnOnPressCallback.bind(this, i+1)}
                                        activeOpacity={0.8}>
                                        <Icon name={item} color="#1e90ff" size={this.bottomIconSize[i]} />
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                </Animated.View>
            </View>
        )
    }

    _renderLoading(){
        /*webview bug 7.0+的系统，确认把开发者选项里的多进程WebView关闭*/
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size="large"/>
                <Text style={{marginTop: 10}}>拼命加载中</Text>
            </View>
        );
    }

    _renderError(){
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Text>Oooops~, 出错了, 重新刷新下吧～</Text>
            </View>
        );
    }

    _renderModalItem(btnId, icon, title){
        return(
            <TouchableOpacity
                onPress={this._btnOnPressCallback.bind(this, btnId)}
                activeOpacity={0.8}>
                <ModalItem icon={icon} title={title}/>
            </TouchableOpacity>
        );
    }

    _btnOnPressCallback(id){
        if(id === 0){
            Alert.alert('', this.props.title, [{text: '好的', onPress: ()=>{}}]);
        }else if(id === 1){
            this.webView.goBack();
        }else if(id === 2){
            this.webView.goForward();
        }else if(id === 3){
            this.webView.reload();
        }else if(id === 4){
            Clipboard.setString(this.props.url);
            Toast.show('已复制到剪贴板', {position: px2dp(-80)});
        }else if(id === 5){
            Linking.canOpenURL(this.props.url).then(supported => {
                if (supported) {
                    Linking.openURL(this.props.url);
                } else {
                    Toast.show('Cannot open it', {position: px2dp(-80)});
                }
            });
        }else if(id === 6){
            let share = new ShareUtil();
            share.share(this.props.title, this.props.url);
        }else if(id === 7){
            this.setState({showMoreContent: !this.state.showMoreContent});
        }
    }
}

class ModalItem extends Component{
    static propTypes = {
        icon: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        titleColor: PropTypes.string
    };

    render(){
        return(
            <View style={styles.modalItem}>
                <View style={{flex: 20}}>
                    <Icon name={this.props.icon} size={px2dp(20)} color={this.props.titleColor}/>
                </View>
                <View style={{flex: 80}}>
                    <Text style={{color: this.props.titleColor}}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.containerBackgroundColor
    },
    contentContainer: {
        flex: 1,
    },
    webview: {
        flex: 1
    },
    bottomInfoBar: {
        position: 'absolute',
        height: px2dp(45),
        width: Dimensions.get('window').width,
        borderTopWidth: 1/PixelRatio.get(),
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor:"#fff",
        bottom:0
    },
    moreContentContainerBackground: {
        position: 'absolute',
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    moreContentContainer: {
        position: 'absolute',
        right: px2dp(5),
        width: px2dp(150),
        height: px2dp(160),
        top: px2dp(50),
        borderRadius: 5,
        paddingLeft: px2dp(10),
        paddingRight: px2dp(10),
        paddingTop: px2dp(5),
        paddingBottom: px2dp(5),
        backgroundColor: "#fff"
    },
    modalItem: {
       // width: px2dp(150),
        height: px2dp(30),
        flexDirection: 'row',
        alignItems: 'center'

    }
});


export default WebViewPage