'use strict';
import {Platform, Dimensions, PixelRatio} from 'react-native';

export default {
    screenHeight: Dimensions.get('window').height,
    screenWidth: Dimensions.get('window').width,
    containerBackgroundColor:"#fff",
    barTitleColor:"#fff",
    barTintColor:"#ff3955",
    touchableHighlightUnderlayColor: 'rgba(255,255,255,0.8)',
    touchableOpacityActiveOpacity: 0.8,
    borderWidth:1/PixelRatio.get(),
    bottomBarItemBgColor:"#fff",
    bottomBarItemColor:"#aaa",
    bottomBarItemSelectedColor:"#ff3955",
}