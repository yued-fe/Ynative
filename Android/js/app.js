'use strict';

import React from 'react';
import {Provider} from 'react-redux';
import {Navigator} from 'react-native-deprecated-custom-components';
import {store} from './store/index';
import IndexPage from './page/index';
import BookStorePage from './page/bookStore';
import SplashScreen from './native_modules/splashScreen';

export default class App extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <Navigator
                    initialRoute={{component: BookStorePage}}
                    renderScene={(route, navigator) =>
                        <route.component {...route.args} navigator={navigator} />
                    }
                />
            </Provider>
        );
    }

    componentDidMount(){
        SplashScreen.hide();//如果首页非RN，取消这句
    }
}
