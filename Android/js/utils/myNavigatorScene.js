/*
 * from https://yj1438.github.io/2016/08/14/rn_sceneconfigs.html
 * more animated:
 * http://reactnative.cn/docs/0.28/animated.html#content
 * https://github.com/oblador/react-native-animatable
 * https://github.com/alexbrillant/react-native-expanding-circle-transition/blob/master/CircleTransition.js
*/
'use strict';
import React, {
    Dimensions,
    PixelRatio
} from 'react-native';

import buildStyleInterpolator from 'buildStyleInterpolator';

const SCREEN_WIDTH = Dimensions.get('window').width,
    SCREEN_HEIGHT = Dimensions.get('window').height;

const OutToLeft = {
    transformTranslate: {
        from: {
            x: 0,
            y: 0,
            z: 0
        },
        to: {
            x: -SCREEN_WIDTH,
            y: 0,
            z: 0
        },
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: true,
        round: PixelRatio.get()
    },
    translateX: {
        from: 0,
        to: -SCREEN_WIDTH,
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: true,
        round: PixelRatio.get()
    },
    opacity: {
        from: 1,
        to: 0,
        min: 0,
        max: 0.5,
        type: 'linear',
        extrapolate: false,
        round: 100
    },
    scale: {
        value: 1,
        type: 'constant'
    }
};

const InFromRight = {
    transformTranslate: {
        from: {
            x: SCREEN_WIDTH,
            y: 0,
            z: 0
        },
        to: {
            x: 0,
            y: 0,
            z: 0
        },
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: true,
        round: PixelRatio.get()
    },
    translateX: {
        from: SCREEN_WIDTH,
        to: 0,
        min: 0,
        max: 1,
        type: 'linear',
        extrapolate: true,
        round: PixelRatio.get()
    },
    // opacity: {
    //     value: 1,
    //     type: 'constant'
    // },
    opacity: {
        from: 0,
        to: 1,
        min: 0.5,
        max: 1,
        type: 'linear',
        extrapolate: true,
        round: PixelRatio.get()
    },
    scale: {
        value: 1,
        type: 'constant'
    }
};

const BaseLeftToRightGesture = {

    // If the gesture can end and restart during one continuous touch
    isDetachable: false,

    // How far the swipe must drag to start transitioning
    gestureDetectMovement: 2,

    // Amplitude of release velocity that is considered still
    notMoving: 0.3,

    // Fraction of directional move required.
    directionRatio: 0.66,

    // Velocity to transition with when the gesture release was "not moving"
    snapVelocity: 2,

    // Region that can trigger swipe. iOS default is 30px from the left edge
    edgeHitWidth: 30,

    // Ratio of gesture completion when non-velocity release will cause action
    stillCompletionRatio: 3 / 5,

    fullDistance: SCREEN_WIDTH,

    direction: 'left-to-right'

};

const MyScene = {
    // 你自定义的输出的动画名称
    PushFromRight: {
        // A list of all gestures that are enabled on this scene
        gestures: {
            pop: BaseLeftToRightGesture
        },

        // Rebound spring parameters when transitioning FROM this scene
        springFriction: 26,
        springTension: 200,

        // Velocity to start at when transitioning without gesture
        // 默认动画的加速度
        defaultTransitionVelocity: 16,

        // Animation interpolators for horizontal transitioning:
        animationInterpolators: {
            into: buildStyleInterpolator(InFromRight),
            out: buildStyleInterpolator(OutToLeft)
        }
    }
};

export default MyScene;