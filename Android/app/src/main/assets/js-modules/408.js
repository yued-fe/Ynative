__d(function(t,e,n,i){"use strict";function s(){return R++}function r(t){if(null===t||"object"!=typeof t)return String(t);var e="__navigatorRouteID";return t.hasOwnProperty(e)||Object.defineProperty(t,e,{enumerable:!1,configurable:!1,writable:!1,value:s()}),t[e]}var a=e(12),o=(e(409),a.NativeModules.AnimationsDebugModule),u=e(410),h=e(411),c=e(420),d=e(428),l=e(429),p=e(160),v=e(430),f=e(275),g=e(431),_=e(13),S=e(432),m=e(433),x=p.PropTypes,I=a.Dimensions.get("window").width,G=a.Dimensions.get("window").height,b={pointerEvents:"none",style:{top:G,bottom:-G,opacity:0}},R=0,y={position:"absolute",overflow:"hidden",left:0,right:0,bottom:0,top:0},k={position:"absolute",left:0,right:0,bottom:0,top:0,transform:[{translateX:0},{translateY:0},{scaleX:1},{scaleY:1},{rotate:"0deg"},{skewX:"0deg"},{skewY:"0deg"}]},C=a.StyleSheet.create({container:{flex:1,overflow:"hidden"},defaultSceneStyle:k,baseScene:y,disabledScene:{top:G,bottom:-G},transitioner:{flex:1,backgroundColor:"transparent",overflow:"hidden"}}),F=["pop","jumpBack","jumpForward"],T=p.createClass({displayName:"Navigator",propTypes:{configureScene:x.func,renderScene:x.func.isRequired,initialRoute:x.object,initialRouteStack:x.arrayOf(x.object),onWillFocus:x.func,onDidFocus:x.func,navigationBar:x.node,navigator:x.object,sceneStyle:a.View.propTypes.style},statics:{BreadcrumbNavigationBar:c,NavigationBar:d,SceneConfigs:l},mixins:[f,u,v.Mixin],getDefaultProps:function(){return{configureScene:function(){return l.PushFromRight},sceneStyle:k}},getInitialState:function(){var t=this;this._navigationBarNavigator=this.props.navigationBarNavigator||this,this._renderedSceneMap=new Map,this._sceneRefs=[];var e=this.props.initialRouteStack||[this.props.initialRoute];_(e.length>=1,"Navigator requires props.initialRoute or props.initialRouteStack.");var n=e.length-1;return this.props.initialRoute&&(n=e.indexOf(this.props.initialRoute),_(n!==-1,"initialRoute is not in initialRouteStack.")),{sceneConfigStack:e.map(function(n){return t.props.configureScene(n,e)}),routeStack:e,presentedIndex:n,transitionFromIndex:null,activeGesture:null,pendingGestureProgress:null,transitionQueue:[]}},componentWillMount:function(){var t=this;this.__defineGetter__("navigationContext",this._getNavigationContext),this._subRouteFocus=[],this.parentNavigator=this.props.navigator,this._handlers={},this.springSystem=new S.SpringSystem,this.spring=this.springSystem.createSpring(),this.spring.setRestSpeedThreshold(.05),this.spring.setCurrentValue(0).setAtRest(),this.spring.addListener({onSpringEndStateChange:function(){t._interactionHandle||(t._interactionHandle=t.createInteractionHandle())},onSpringUpdate:function(){t._handleSpringUpdate()},onSpringAtRest:function(){t._completeTransition()}}),this.panGesture=a.PanResponder.create({onMoveShouldSetPanResponder:this._handleMoveShouldSetPanResponder,onPanResponderRelease:this._handlePanResponderRelease,onPanResponderMove:this._handlePanResponderMove,onPanResponderTerminate:this._handlePanResponderTerminate}),this._interactionHandle=null,this._emitWillFocus(this.state.routeStack[this.state.presentedIndex])},componentDidMount:function(){this._handleSpringUpdate(),this._emitDidFocus(this.state.routeStack[this.state.presentedIndex]),this._enableTVEventHandler()},componentWillUnmount:function(){this._navigationContext&&(this._navigationContext.dispose(),this._navigationContext=null),this.spring.destroy(),this._interactionHandle&&this.clearInteractionHandle(this._interactionHandle),this._disableTVEventHandler()},immediatelyResetRouteStack:function(t){var e=this,n=t.length-1;this._emitWillFocus(t[n]),this.setState({routeStack:t,sceneConfigStack:t.map(function(n){return e.props.configureScene(n,t)}),presentedIndex:n,activeGesture:null,transitionFromIndex:null,transitionQueue:[]},function(){e._handleSpringUpdate();var t=e._navBar;t&&t.immediatelyRefresh&&t.immediatelyRefresh(),e._emitDidFocus(e.state.routeStack[e.state.presentedIndex])})},_transitionTo:function(t,e,n,i){if(this.state.presentedIndex===t)return void(i&&i());if(null!==this.state.transitionFromIndex)return void this.state.transitionQueue.push({destIndex:t,velocity:e,cb:i});this.state.transitionFromIndex=this.state.presentedIndex,this.state.presentedIndex=t,this.state.transitionCb=i,this._onAnimationStart(),o&&o.startRecordingFps();var s=this.state.sceneConfigStack[this.state.transitionFromIndex]||this.state.sceneConfigStack[this.state.presentedIndex];_(s,"Cannot configure scene at index "+this.state.transitionFromIndex),null!=n&&this.spring.setCurrentValue(n),this.spring.setOvershootClampingEnabled(!0),this.spring.getSpringConfig().friction=s.springFriction,this.spring.getSpringConfig().tension=s.springTension,this.spring.setVelocity(e||s.defaultTransitionVelocity),this.spring.setEndValue(1)},_handleSpringUpdate:function(){if(this.isMounted())if(null!=this.state.transitionFromIndex)this._transitionBetween(this.state.transitionFromIndex,this.state.presentedIndex,this.spring.getCurrentValue());else if(null!=this.state.activeGesture){var t=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);this._transitionBetween(this.state.presentedIndex,t,this.spring.getCurrentValue())}},_completeTransition:function(){if(this.isMounted()){if(1!==this.spring.getCurrentValue()&&0!==this.spring.getCurrentValue())return void(this.state.pendingGestureProgress&&(this.state.pendingGestureProgress=null));this._onAnimationEnd();var t=this.state.presentedIndex,e=this._subRouteFocus[t]||this.state.routeStack[t];if(o&&o.stopRecordingFps(Date.now()),this.state.transitionFromIndex=null,this.spring.setCurrentValue(0).setAtRest(),this._hideScenes(),this.state.transitionCb&&(this.state.transitionCb(),this.state.transitionCb=null),this._emitDidFocus(e),this._interactionHandle&&(this.clearInteractionHandle(this._interactionHandle),this._interactionHandle=null),this.state.pendingGestureProgress){var n=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);return this._enableScene(n),void this.spring.setEndValue(this.state.pendingGestureProgress)}if(this.state.transitionQueue.length){var i=this.state.transitionQueue.shift();this._enableScene(i.destIndex),this._emitWillFocus(this.state.routeStack[i.destIndex]),this._transitionTo(i.destIndex,i.velocity,null,i.cb)}}},_emitDidFocus:function(t){this.navigationContext.emit("didfocus",{route:t}),this.props.onDidFocus&&this.props.onDidFocus(t)},_emitWillFocus:function(t){this.navigationContext.emit("willfocus",{route:t});var e=this._navBar;e&&e.handleWillFocus&&e.handleWillFocus(t),this.props.onWillFocus&&this.props.onWillFocus(t)},_hideScenes:function(){var t=null;this.state.activeGesture&&(t=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture));for(var e=0;e<this.state.routeStack.length;e++)e!==this.state.presentedIndex&&e!==this.state.transitionFromIndex&&e!==t&&this._disableScene(e)},_disableScene:function(t){this._sceneRefs[t]&&this._sceneRefs[t].setNativeProps(b)},_enableScene:function(t){var e=m([y,this.props.sceneStyle]),n={pointerEvents:"auto",style:{top:e.top,bottom:e.bottom}};t!==this.state.transitionFromIndex&&t!==this.state.presentedIndex&&(n.style.opacity=0),this._sceneRefs[t]&&this._sceneRefs[t].setNativeProps(n)},_clearTransformations:function(t){var e=m([k]);this._sceneRefs[t].setNativeProps({style:e})},_onAnimationStart:function(){var t=this.state.presentedIndex,e=this.state.presentedIndex;null!=this.state.transitionFromIndex?t=this.state.transitionFromIndex:this.state.activeGesture&&(e=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture)),this._setRenderSceneToHardwareTextureAndroid(t,!0),this._setRenderSceneToHardwareTextureAndroid(e,!0);var n=this._navBar;n&&n.onAnimationStart&&n.onAnimationStart(t,e)},_onAnimationEnd:function(){for(var t=this.state.routeStack.length-1,e=0;e<=t;e++)this._setRenderSceneToHardwareTextureAndroid(e,!1);var n=this._navBar;n&&n.onAnimationEnd&&n.onAnimationEnd()},_setRenderSceneToHardwareTextureAndroid:function(t,e){var n=this._sceneRefs[t];null!==n&&void 0!==n&&n.setNativeProps({renderToHardwareTextureAndroid:e})},_handleTouchStart:function(){this._eligibleGestures=F},_handleMoveShouldSetPanResponder:function(t,e){var n=this.state.sceneConfigStack[this.state.presentedIndex];return!!n&&(this._expectingGestureGrant=this._matchGestureAction(this._eligibleGestures,n.gestures,e),!!this._expectingGestureGrant)},_doesGestureOverswipe:function(t){var e=this.state.presentedIndex<=0&&("pop"===t||"jumpBack"===t),n=this.state.presentedIndex>=this.state.routeStack.length-1&&"jumpForward"===t;return n||e},_deltaForGestureAction:function(t){switch(t){case"pop":case"jumpBack":return-1;case"jumpForward":return 1;default:return void _(!1,"Unsupported gesture action "+t)}},_handlePanResponderRelease:function(t,e){var n=this,i=this.state.sceneConfigStack[this.state.presentedIndex],s=this.state.activeGesture;if(s){var r=i.gestures[s],a=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);if(0===this.spring.getCurrentValue())return this.spring.setCurrentValue(0).setAtRest(),void this._completeTransition();var o,u,h="top-to-bottom"===r.direction||"bottom-to-top"===r.direction,c="right-to-left"===r.direction||"bottom-to-top"===r.direction;h?(o=c?-e.vy:e.vy,u=c?-e.dy:e.dy):(o=c?-e.vx:e.vx,u=c?-e.dx:e.dx);var d=g(-10,o,10);if(Math.abs(o)<r.notMoving){var l=u>r.fullDistance*r.stillCompletionRatio;d=l?r.snapVelocity:-r.snapVelocity}if(d<0||this._doesGestureOverswipe(s)){if(null==this.state.transitionFromIndex){var p=this.state.presentedIndex;this.state.presentedIndex=a,this._transitionTo(p,-d,1-this.spring.getCurrentValue())}}else this._emitWillFocus(this.state.routeStack[a]),this._transitionTo(a,d,null,function(){"pop"===s&&n._cleanScenesPastIndex(a)});this._detachGesture()}},_handlePanResponderTerminate:function(t,e){if(null!=this.state.activeGesture){var n=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);this._detachGesture();var i=this.state.presentedIndex;this.state.presentedIndex=n,this._transitionTo(i,null,1-this.spring.getCurrentValue())}},_attachGesture:function(t){this.state.activeGesture=t;var e=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);this._enableScene(e)},_detachGesture:function(){this.state.activeGesture=null,this.state.pendingGestureProgress=null,this._hideScenes()},_handlePanResponderMove:function(t,e){void 0!==this._isMoveGestureAttached&&(_(this._expectingGestureGrant,"Responder granted unexpectedly."),this._attachGesture(this._expectingGestureGrant),this._onAnimationStart(),this._expectingGestureGrant=void 0);var n=this.state.sceneConfigStack[this.state.presentedIndex];if(this.state.activeGesture){var i=n.gestures[this.state.activeGesture];return this._moveAttachedGesture(i,e)}var s=this._matchGestureAction(F,n.gestures,e);s&&this._attachGesture(s)},_moveAttachedGesture:function(t,e){var n="top-to-bottom"===t.direction||"bottom-to-top"===t.direction,i="right-to-left"===t.direction||"bottom-to-top"===t.direction,s=n?e.dy:e.dx;s=i?-s:s;var r=t.gestureDetectMovement,a=(s-r)/(t.fullDistance-r);if(a<0&&t.isDetachable){var o=this.state.presentedIndex+this._deltaForGestureAction(this.state.activeGesture);return this._transitionBetween(this.state.presentedIndex,o,0),this._detachGesture(),void(null!=this.state.pendingGestureProgress&&this.spring.setCurrentValue(0))}if(t.overswipe&&this._doesGestureOverswipe(this.state.activeGesture)){var u=t.overswipe.frictionConstant,h=t.overswipe.frictionByDistance,c=1/(u+Math.abs(a)*h);a*=c}a=g(0,a,1),null!=this.state.transitionFromIndex?this.state.pendingGestureProgress=a:this.state.pendingGestureProgress?this.spring.setEndValue(a):this.spring.setCurrentValue(a)},_matchGestureAction:function(t,e,n){var i=this;if(!e||!t||!t.some)return null;var s=null;return t.some(function(t,r){var a=e[t];if(a){if(null==a.overswipe&&i._doesGestureOverswipe(t))return!1;var o="top-to-bottom"===a.direction||"bottom-to-top"===a.direction,u="right-to-left"===a.direction||"bottom-to-top"===a.direction,h=o?n.y0:n.x0,c=o?n.moveY:n.moveX,d=o?n.dy:n.dx,l=o?n.dx:n.dy,p=a.edgeHitWidth;u&&(h=-h,c=-c,d=-d,l=-l,p=o?-(G-p):-(I-p)),0===h&&(h=c);var v=null==a.edgeHitWidth||h<p;if(!v)return!1;var f=d>=a.gestureDetectMovement;if(!f)return!1;var g=Math.abs(d)>Math.abs(l)*a.directionRatio;return g?(s=t,!0):void(i._eligibleGestures=i._eligibleGestures.slice().splice(r,1))}}),s||null},_transitionSceneStyle:function(t,e,n,i){var s=this._sceneRefs[i];if(null!==s&&void 0!==s){var r=t<e?e:t,a=this.state.sceneConfigStack[r];a||(a=this.state.sceneConfigStack[r-1]);var o={},u=i<t||i<e?a.animationInterpolators.out:a.animationInterpolators.into,h=t<e?n:1-n,c=u(o,h);c&&s.setNativeProps({style:o})}},_transitionBetween:function(t,e,n){this._transitionSceneStyle(t,e,n,t),this._transitionSceneStyle(t,e,n,e);var i=this._navBar;i&&i.updateProgress&&e>=0&&t>=0&&i.updateProgress(n,t,e)},_handleResponderTerminationRequest:function(){return!1},_getDestIndexWithinBounds:function(t){var e=this.state.presentedIndex,n=e+t;_(n>=0,"Cannot jump before the first route.");var i=this.state.routeStack.length-1;return _(i>=n,"Cannot jump past the last route."),n},_jumpN:function(t){var e=this._getDestIndexWithinBounds(t);this._enableScene(e),this._emitWillFocus(this.state.routeStack[e]),this._transitionTo(e)},jumpTo:function(t){var e=this.state.routeStack.indexOf(t);_(e!==-1,"Cannot jump to route that is not in the route stack"),this._jumpN(e-this.state.presentedIndex)},jumpForward:function(){this._jumpN(1)},jumpBack:function(){this._jumpN(-1)},push:function(t){var e=this;_(!!t,"Must supply route to push");var n=this.state.presentedIndex+1,i=this.state.routeStack.slice(0,n),s=this.state.sceneConfigStack.slice(0,n),r=i.concat([t]),a=r.length-1,o=this.props.configureScene(t,r),u=s.concat([o]);this._emitWillFocus(r[a]),this.setState({routeStack:r,sceneConfigStack:u},function(){e._enableScene(a),e._transitionTo(a,o.defaultTransitionVelocity)})},popN:function(t){var e=this;if(_("number"==typeof t,"Must supply a number to popN"),t=parseInt(t,10),!(t<=0||this.state.presentedIndex-t<0)){var n=this.state.presentedIndex-t,i=this.state.routeStack[this.state.presentedIndex],s=this.props.configureScene(i);this._enableScene(n),this._clearTransformations(n),this._emitWillFocus(this.state.routeStack[n]),this._transitionTo(n,s.defaultTransitionVelocity,null,function(){e._cleanScenesPastIndex(n)})}},pop:function(){this.state.transitionQueue.length||this.popN(1)},replaceAtIndex:function(t,e,n){var i=this;if(_(!!t,"Must supply route to replace"),e<0&&(e+=this.state.routeStack.length),!(this.state.routeStack.length<=e)){var s=this.state.routeStack.slice(),r=this.state.sceneConfigStack.slice();s[e]=t,r[e]=this.props.configureScene(t,s),e===this.state.presentedIndex&&this._emitWillFocus(t),this.setState({routeStack:s,sceneConfigStack:r},function(){e===i.state.presentedIndex&&i._emitDidFocus(t),n&&n()})}},replace:function(t){this.replaceAtIndex(t,this.state.presentedIndex)},replacePrevious:function(t){this.replaceAtIndex(t,this.state.presentedIndex-1)},popToTop:function(){this.popToRoute(this.state.routeStack[0])},popToRoute:function(t){var e=this.state.routeStack.indexOf(t);_(e!==-1,"Calling popToRoute for a route that doesn't exist!");var n=this.state.presentedIndex-e;this.popN(n)},replacePreviousAndPop:function(t){this.state.routeStack.length<2||(this.replacePrevious(t),this.pop())},resetTo:function(t){var e=this;_(!!t,"Must supply route to push"),this.replaceAtIndex(t,0,function(){e.popN(e.state.presentedIndex)})},getCurrentRoutes:function(){return this.state.routeStack.slice()},_cleanScenesPastIndex:function(t){var e=t+1;e<this.state.routeStack.length&&this.setState({sceneConfigStack:this.state.sceneConfigStack.slice(0,e),routeStack:this.state.routeStack.slice(0,e)})},_renderScene:function(t,e){var n=this,i=null,s="auto";return e!==this.state.presentedIndex&&(i=C.disabledScene,s="none"),p.createElement(a.View,{collapsable:!1,key:"scene_"+r(t),ref:function(t){n._sceneRefs[e]=t},onStartShouldSetResponderCapture:function(){return null!=n.state.transitionFromIndex},pointerEvents:s,style:[C.baseScene,this.props.sceneStyle,i]},this.props.renderScene(t,this))},_renderNavigationBar:function(){var t=this,e=this.props.navigationBar;return e?p.cloneElement(e,{ref:function(n){t._navBar=n,e&&"function"==typeof e.ref&&e.ref(n)},navigator:this._navigationBarNavigator,navState:this.state}):null},_tvEventHandler:a.TVEventHandler,_enableTVEventHandler:function(){a.TVEventHandler&&(this._tvEventHandler=new a.TVEventHandler,this._tvEventHandler.enable(this,function(t,e){e&&"menu"===e.eventType&&t.pop()}))},_disableTVEventHandler:function(){this._tvEventHandler&&(this._tvEventHandler.disable(),delete this._tvEventHandler)},render:function(){var t=this,e=new Map,n=this.state.routeStack.map(function(n,i){var s;return s=t._renderedSceneMap.has(n)&&i!==t.state.presentedIndex?t._renderedSceneMap.get(n):t._renderScene(n,i),e.set(n,s),s});return this._renderedSceneMap=e,p.createElement(a.View,{style:[C.container,this.props.style]},p.createElement(a.View,babelHelpers.extends({style:C.transitioner},this.panGesture.panHandlers,{onTouchStart:this._handleTouchStart,onResponderTerminationRequest:this._handleResponderTerminationRequest}),n),this._renderNavigationBar())},_getNavigationContext:function(){return this._navigationContext||(this._navigationContext=new h),this._navigationContext}});n.exports=T},408);