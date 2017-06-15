'use strict';

import React from 'react';
import {Platform} from 'react-native';
import {Provider} from 'react-redux';
import {Navigator} from 'react-native-deprecated-custom-components';
import {store} from './store/index';
import IndexPage from './page/index';
import BookStorePage from './page/bookStore';
import SplashScreen from './native_modules/splashScreen';
import cunstomSceneConfigs from './utils/customNavigatorSceneConfigs';

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

                            if (route.args.anim === 'pushFromRight') {
                                return Navigator.SceneConfigs.PushFromRight;
                            }

                            if(route.args.anim === 'customPushFromRight') {
                                return cunstomSceneConfigs.PushFromRight;
                            }
                        }

                        return Navigator.SceneConfigs.FloatFromRight
                    }}
                />
            </Provider>
        );
    }

    componentDidMount(){
        SplashScreen.hide();//如果首页非RN，取消这句
    }
}
