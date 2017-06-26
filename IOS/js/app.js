'use strict';

import React from 'react';
import {Platform} from 'react-native';
import {Provider} from 'react-redux';
import {Navigator} from 'react-native-deprecated-custom-components';
import {store} from './store/index';
import IndexPage from './page/index';
import BookStorePage from './page/bookStore';
import SplashScreen from './native_modules/splashScreen';
import cunstomSceneConfigs from './animation/myNavigatorScene';

export default class App extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <Navigator
                    initialRoute={{component: BookStorePage}}
                    renderScene={(route, navigator) =>
                        <route.component {...route.args} navigator={navigator} />
                    }
                    configureScene = {(route,routeStack) => {
                        /**
                         * PushFromRight
                         * PushFromLeft
                         * FloatFromRight
                         * FloatFromLeft
                         * FloatFromBottom
                         * FloatFromBottomAndroid
                         * FadeAndroid
                         * SwipeFromLeft
                         * HorizontalSwipeJump
                         * HorizontalSwipeJumpFromRight
                         * HorizontalSwipeJumpFromLeft
                         * VerticalUpSwipeJump
                         * VerticalDownSwipeJump
                         */
                        if (route.args) {
                            if (route.args.anim === 'floatFromBottom') {
                                return Platform.OS === 'android' ?
                                    Navigator.SceneConfigs.FloatFromBottomAndroid : Navigator.SceneConfigs.FloatFromBottom;
                            }
                            if (route.args.anim === 'floatFromLeft') {
                                return Navigator.SceneConfigs.FloatFromLeft;
                            }

                            if (route.args.anim === 'floatFromRight') {
                                return Navigator.SceneConfigs.FloatFromRight;
                            }

                            if (route.args.anim === 'pushFromLeft') {
                                return Navigator.SceneConfigs.PushFromLeft;
                            }

                            if (route.args.anim === 'pushFromRight') {
                                return Navigator.SceneConfigs.PushFromRight;
                            }

                            if (route.args.anim === 'swipeFromLeft') {
                                return Navigator.SceneConfigs.SwipeFromLeft;
                            }

                            if (route.args.anim === 'horizontalSwipeJump') {
                                return Navigator.SceneConfigs.HorizontalSwipeJump;
                            }

                            if (route.args.anim === 'verticalUpSwipeJump') {
                                return Navigator.SceneConfigs.VerticalUpSwipeJump;
                            }

                            if (route.args.anim === 'verticalDownSwipeJump') {
                                return Navigator.SceneConfigs.VerticalDownSwipeJump;
                            }

                            if (route.args.anim === 'customPushFromRight') {
                                return cunstomSceneConfigs.PushFromRight;
                            }

                            if(route.args.anim === 'animationScaleInRight') {
                                return cunstomSceneConfigs.AnimationScaleInRight;
                            }

                            if(route.args.anim === 'animationScaleInRightDown') {
                                return cunstomSceneConfigs.AnimationScaleInRightDown;
                            }

                            if(route.args.anim === 'animationScaleInRightUp') {
                                return cunstomSceneConfigs.AnimationScaleInRightUp;
                            }

                            if(route.args.anim === 'animationRotateInLeft') {
                                return cunstomSceneConfigs.AnimationRotateInLeft;
                            }

                            if(route.args.anim === 'customAnimation') {
                                return cunstomSceneConfigs.CustomAnimation("rightin","leftout");
                            }

                            if(route.args.anim === 'switchMain') {
                                return cunstomSceneConfigs.SwitchMain;
                            }
                        }

                        return Navigator.SceneConfigs.PushFromRight;
                    }}
                />
            </Provider>
        );
    }

    componentDidMount(){
        SplashScreen.hide();//如果首页非RN，取消这句
    }
}
