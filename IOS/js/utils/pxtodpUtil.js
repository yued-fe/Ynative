'use strict';

import {Dimensions} from 'react-native';

// device width/height
const deviceWidthDp = Dimensions.get('window').width;
const deviceHeightDp = Dimensions.get('window').height;
// design width/height
const uiWidthPx = 375;
const uiHeightPx = 640;

export default function pxtodp(uiElementPx) {
    //return uiElementPx *  deviceHeightDp / uiHeightPx;
    return uiElementPx *  deviceWidthDp / uiWidthPx;
}