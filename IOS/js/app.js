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
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

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
    componentWillMount() {
        //加入本地缓存
        let storage = new Storage({
            // 最大容量，默认值1000条数据循环存储
            size: 1000,

            // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
            // 如果不指定则数据只会保存在内存中，重启后即丢失
            storageBackend: AsyncStorage,

            // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
            defaultExpires: 1000 * 3600 * 24,

            // 读写时在内存中缓存数据。默认启用。
            enableCache: true,

            // 如果storage中没有相应数据，或数据已过期，
            // 则会调用相应的sync方法，无缝返回最新数据。
            // sync方法的具体说明会在后文提到
            // 你可以在构造函数这里就写好sync的方法
            // 或是写到另一个文件里，这里require引入
            // 或是在任何时候，直接对storage.sync进行赋值修改
            //sync: require('./sync')  // 这个sync文件是要你自己写的
        })
        //挂载到全局
        global.storage = storage;
    }

    componentDidMount(){
        SplashScreen.hide();//如果首页非RN，取消这句
    }
}
