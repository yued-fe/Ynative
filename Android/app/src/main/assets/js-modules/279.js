__d(function(t,e,i,n){"use strict";function a(t){return t.useNativeDriver&&!p.isNativeAnimatedAvailable()?(C||(console.warn("Animated: `useNativeDriver` is not supported because the native animated module is missing. Falling back to JS-based animation. To resolve this, add `RCTAnimation` module to this app, or remove `useNativeDriver`. More info: https://github.com/facebook/react-native/issues/11094#issuecomment-263240420"),C=!0),!1):t.useNativeDriver||!1}function s(t){function e(t){"function"==typeof t.update?i.add(t):t.__getChildren().forEach(e)}var i=new y;e(t),i.forEach(function(t){return t.update()})}function o(){if(!T){var t=e(288);T=t.inOut(t.ease)}return T}function r(t,e){return void 0===t||null===t?e:t}function _(t){var e=function(e){function i(t){babelHelpers.classCallCheck(this,i);var e=babelHelpers.possibleConstructorReturn(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,t));return e._eventDetachers=[],e._setComponentRef=e._setComponentRef.bind(e),e}return babelHelpers.inherits(i,e),babelHelpers.createClass(i,[{key:"componentWillUnmount",value:function(){this._propsAnimated&&this._propsAnimated.__detach(),this._detachNativeEvents()}},{key:"setNativeProps",value:function(t){this._component.setNativeProps(t)}},{key:"componentWillMount",value:function(){this._attachProps(this.props)}},{key:"componentDidMount",value:function(){this._propsAnimated.setNativeView(this._component),this._attachNativeEvents()}},{key:"_attachNativeEvents",value:function(){var t=this,e=this._component.getScrollableNode?this._component.getScrollableNode():this._component,i=function(i){var n=t.props[i];n instanceof ot&&n.__isNative&&(n.__attach(e,i),t._eventDetachers.push(function(){return n.__detach(e,i)}))};for(var n in this.props)i(n)}},{key:"_detachNativeEvents",value:function(){this._eventDetachers.forEach(function(t){return t()}),this._eventDetachers=[]}},{key:"_attachProps",value:function(t){var e=this,i=this._propsAnimated,n=function(){if(e._component.setNativeProps){if(e._propsAnimated.__isNative)throw new Error('Attempting to run JS driven animation on animated node that has been moved to "native" earlier by starting an animation with `useNativeDriver: true`');e._component.setNativeProps(e._propsAnimated.__getAnimatedValue())}else e.forceUpdate()};this._propsAnimated=new Y(t,n),i&&i.__detach()}},{key:"componentWillReceiveProps",value:function(t){this._attachProps(t)}},{key:"componentDidUpdate",value:function(t){this._component!==this._prevComponent&&this._propsAnimated.setNativeView(this._component),this._component===this._prevComponent&&t===this.props||(this._detachNativeEvents(),this._attachNativeEvents())}},{key:"render",value:function(){return f.createElement(t,babelHelpers.extends({},this._propsAnimated.__getValue(),{ref:this._setComponentRef}))}},{key:"_setComponentRef",value:function(t){this._prevComponent=this._component,this._component=t}},{key:"getNode",value:function(){return this._component}}]),i}(f.Component),i=t.__propTypesSecretDontUseThesePlease||t.propTypes;return e.propTypes={style:function(t,e,n){if(i)for(var a in b)i[a]||void 0===t[a]||console.warn("You are setting the style `{ "+a+": ... }` as a prop. You should nest it in a style object. E.g. `{ style: { "+a+": ... } }`")}},e}function l(t,e,i){var n=[],a=function t(e,i){if(e instanceof L)e.__makeNative(),n.push({nativeEventPath:i,animatedValueTag:e.__getNativeTag()});else if("object"==typeof e)for(var a in e)t(e[a],i.concat(a))};k(i[0]&&i[0].nativeEvent,"Native driven events only support animated values contained inside `nativeEvent`."),a(i[0].nativeEvent,[]);var s=d.findNodeHandle(t);return n.forEach(function(t){V.addAnimatedEventToView(s,e,t)}),{detach:function(){n.forEach(function(t){V.removeAnimatedEventFromView(s,e,t.animatedValueTag)})}}}function u(t,e){return t?t instanceof ot?(t.__addListener(e),t):function(){"function"==typeof t&&t.apply(void 0,arguments),e.apply(void 0,arguments)}:e}function h(t,e){t&&t instanceof ot&&t.__removeListener(e)}var c=e(280),v=e(283),p=e(284),f=e(208),d=e(48),y=e(133),m=e(285),b=e(218),g=e(89),k=e(13),N=e(286),V=p.API,C=!1,H=function(){function t(){babelHelpers.classCallCheck(this,t)}return babelHelpers.createClass(t,[{key:"__attach",value:function(){}},{key:"__detach",value:function(){this.__isNative&&null!=this.__nativeTag&&(V.dropAnimatedNode(this.__nativeTag),this.__nativeTag=void 0)}},{key:"__getValue",value:function(){}},{key:"__getAnimatedValue",value:function(){return this.__getValue()}},{key:"__addChild",value:function(t){}},{key:"__removeChild",value:function(t){}},{key:"__getChildren",value:function(){return[]}},{key:"__makeNative",value:function(){if(!this.__isNative)throw new Error('This node cannot be made a "native" animated node')}},{key:"__getNativeTag",value:function(){if(p.assertNativeAnimatedModule(),k(this.__isNative,'Attempt to get native tag from node not marked as "native"'),null==this.__nativeTag){var t=p.generateNewNodeTag();V.createAnimatedNode(t,this.__getNativeConfig()),this.__nativeTag=t}return this.__nativeTag}},{key:"__getNativeConfig",value:function(){throw new Error("This JS animated node type cannot be used as native animated node")}},{key:"toJSON",value:function(){return this.__getValue()}}]),t}(),A=function(){function t(){babelHelpers.classCallCheck(this,t)}return babelHelpers.createClass(t,[{key:"start",value:function(t,e,i,n,a){}},{key:"stop",value:function(){this.__nativeId&&V.stopAnimation(this.__nativeId)}},{key:"__getNativeAnimationConfig",value:function(){throw new Error("This animation type cannot be offloaded to native")}},{key:"__debouncedOnEnd",value:function(t){var e=this.__onEnd;this.__onEnd=null,e&&e(t)}},{key:"__startNativeAnimation",value:function(t){t.__makeNative(),this.__nativeId=p.generateNewAnimationId(),V.startAnimatingNode(this.__nativeId,t.__getNativeTag(),this.__getNativeAnimationConfig(),this.__debouncedOnEnd.bind(this))}}]),t}(),O=function(t){function e(){babelHelpers.classCallCheck(this,e);var t=babelHelpers.possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t._children=[],t}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"__makeNative",value:function(){if(!this.__isNative){this.__isNative=!0;for(var t=this._children,e=Array.isArray(t),i=0,t=e?t:t["function"==typeof Symbol?Symbol.iterator:"@@iterator"]();;){var n;if(e){if(i>=t.length)break;n=t[i++]}else{if(i=t.next(),i.done)break;n=i.value}var a=n;a.__makeNative(),V.connectAnimatedNodes(this.__getNativeTag(),a.__getNativeTag())}}}},{key:"__addChild",value:function(t){0===this._children.length&&this.__attach(),this._children.push(t),this.__isNative&&(t.__makeNative(),V.connectAnimatedNodes(this.__getNativeTag(),t.__getNativeTag()))}},{key:"__removeChild",value:function(t){var e=this._children.indexOf(t);return e===-1?void console.warn("Trying to remove a child that doesn't exist"):(this.__isNative&&t.__isNative&&V.disconnectAnimatedNodes(this.__getNativeTag(),t.__getNativeTag()),this._children.splice(e,1),void(0===this._children.length&&this.__detach()))}},{key:"__getChildren",value:function(){return this._children}}]),e}(H),T=void 0,w=function(e){function i(t){babelHelpers.classCallCheck(this,i);var e=babelHelpers.possibleConstructorReturn(this,(i.__proto__||Object.getPrototypeOf(i)).call(this));return e._toValue=t.toValue,e._easing=void 0!==t.easing?t.easing:o(),e._duration=void 0!==t.duration?t.duration:500,e._delay=void 0!==t.delay?t.delay:0,e.__iterations=void 0!==t.iterations?t.iterations:1,e.__isInteraction=void 0===t.isInteraction||t.isInteraction,e._useNativeDriver=a(t),e}return babelHelpers.inherits(i,e),babelHelpers.createClass(i,[{key:"__getNativeAnimationConfig",value:function(){for(var t=16.666666666666668,e=[],i=0;i<this._duration;i+=t)e.push(this._easing(i/this._duration));return e.push(this._easing(1)),{type:"frames",frames:e,toValue:this._toValue,iterations:this.__iterations}}},{key:"start",value:function t(e,i,n,a,s){var o=this;this.__active=!0,this._fromValue=e,this._onUpdate=i,this.__onEnd=n;var t=function(){0!==o._duration||o._useNativeDriver?(o._startTime=Date.now(),o._useNativeDriver?o.__startNativeAnimation(s):o._animationFrame=N(o.onUpdate.bind(o))):(o._onUpdate(o._toValue),o.__debouncedOnEnd({finished:!0}))};this._delay?this._timeout=setTimeout(t,this._delay):t()}},{key:"onUpdate",value:function(){var t=Date.now();return t>=this._startTime+this._duration?(0===this._duration?this._onUpdate(this._toValue):this._onUpdate(this._fromValue+this._easing(1)*(this._toValue-this._fromValue)),void this.__debouncedOnEnd({finished:!0})):(this._onUpdate(this._fromValue+this._easing((t-this._startTime)/this._duration)*(this._toValue-this._fromValue)),void(this.__active&&(this._animationFrame=N(this.onUpdate.bind(this)))))}},{key:"stop",value:function(){babelHelpers.get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"stop",this).call(this),this.__active=!1,clearTimeout(this._timeout),t.cancelAnimationFrame(this._animationFrame),this.__debouncedOnEnd({finished:!1})}}]),i}(A),P=function(e){function i(t){babelHelpers.classCallCheck(this,i);var e=babelHelpers.possibleConstructorReturn(this,(i.__proto__||Object.getPrototypeOf(i)).call(this));return e._deceleration=void 0!==t.deceleration?t.deceleration:.998,e._velocity=t.velocity,e._useNativeDriver=a(t),e.__isInteraction=void 0===t.isInteraction||t.isInteraction,e.__iterations=void 0!==t.iterations?t.iterations:1,e}return babelHelpers.inherits(i,e),babelHelpers.createClass(i,[{key:"__getNativeAnimationConfig",value:function(){return{type:"decay",deceleration:this._deceleration,velocity:this._velocity,iterations:this.__iterations}}},{key:"start",value:function(t,e,i,n,a){this.__active=!0,this._lastValue=t,this._fromValue=t,this._onUpdate=e,this.__onEnd=i,this._startTime=Date.now(),this._useNativeDriver?this.__startNativeAnimation(a):this._animationFrame=N(this.onUpdate.bind(this))}},{key:"onUpdate",value:function(){var t=Date.now(),e=this._fromValue+this._velocity/(1-this._deceleration)*(1-Math.exp(-(1-this._deceleration)*(t-this._startTime)));return this._onUpdate(e),Math.abs(this._lastValue-e)<.1?void this.__debouncedOnEnd({finished:!0}):(this._lastValue=e,void(this.__active&&(this._animationFrame=N(this.onUpdate.bind(this)))))}},{key:"stop",value:function(){babelHelpers.get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"stop",this).call(this),this.__active=!1,t.cancelAnimationFrame(this._animationFrame),this.__debouncedOnEnd({finished:!1})}}]),i}(A),E=function(e){function i(t){babelHelpers.classCallCheck(this,i);var e=babelHelpers.possibleConstructorReturn(this,(i.__proto__||Object.getPrototypeOf(i)).call(this));e._overshootClamping=r(t.overshootClamping,!1),e._restDisplacementThreshold=r(t.restDisplacementThreshold,.001),e._restSpeedThreshold=r(t.restSpeedThreshold,.001),e._initialVelocity=t.velocity,e._lastVelocity=r(t.velocity,0),e._toValue=t.toValue,e._useNativeDriver=a(t),e.__isInteraction=void 0===t.isInteraction||t.isInteraction,e.__iterations=void 0!==t.iterations?t.iterations:1;var n;return void 0!==t.bounciness||void 0!==t.speed?(k(void 0===t.tension&&void 0===t.friction,"You can only define bounciness/speed or tension/friction but not both"),n=m.fromBouncinessAndSpeed(r(t.bounciness,8),r(t.speed,12))):n=m.fromOrigamiTensionAndFriction(r(t.tension,40),r(t.friction,7)),e._tension=n.tension,e._friction=n.friction,e}return babelHelpers.inherits(i,e),babelHelpers.createClass(i,[{key:"__getNativeAnimationConfig",value:function(){return{type:"spring",overshootClamping:this._overshootClamping,restDisplacementThreshold:this._restDisplacementThreshold,restSpeedThreshold:this._restSpeedThreshold,tension:this._tension,friction:this._friction,initialVelocity:r(this._initialVelocity,this._lastVelocity),toValue:this._toValue,iterations:this.__iterations}}},{key:"start",value:function(t,e,n,a,s){if(this.__active=!0,this._startPosition=t,this._lastPosition=this._startPosition,this._onUpdate=e,this.__onEnd=n,this._lastTime=Date.now(),a instanceof i){var o=a.getInternalState();this._lastPosition=o.lastPosition,this._lastVelocity=o.lastVelocity,this._lastTime=o.lastTime}void 0!==this._initialVelocity&&null!==this._initialVelocity&&(this._lastVelocity=this._initialVelocity),this._useNativeDriver?this.__startNativeAnimation(s):this.onUpdate()}},{key:"getInternalState",value:function(){return{lastPosition:this._lastPosition,lastVelocity:this._lastVelocity,lastTime:this._lastTime}}},{key:"onUpdate",value:function(){var t=this._lastPosition,e=this._lastVelocity,i=this._lastPosition,n=this._lastVelocity,a=64,s=Date.now();s>this._lastTime+a&&(s=this._lastTime+a);for(var o=1,r=Math.floor((s-this._lastTime)/o),_=0;_<r;++_){var l=o/1e3,u=e,h=this._tension*(this._toValue-i)-this._friction*n,i=t+u*l/2,n=e+h*l/2,c=n,v=this._tension*(this._toValue-i)-this._friction*n;i=t+c*l/2,n=e+v*l/2;var p=n,f=this._tension*(this._toValue-i)-this._friction*n;i=t+p*l/2,n=e+f*l/2;var d=n,y=this._tension*(this._toValue-i)-this._friction*n;i=t+p*l/2,n=e+f*l/2;var m=(u+2*(c+p)+d)/6,b=(h+2*(v+f)+y)/6;t+=m*l,e+=b*l}if(this._lastTime=s,this._lastPosition=t,this._lastVelocity=e,this._onUpdate(t),this.__active){var g=!1;this._overshootClamping&&0!==this._tension&&(g=this._startPosition<this._toValue?t>this._toValue:t<this._toValue);var k=Math.abs(e)<=this._restSpeedThreshold,V=!0;return 0!==this._tension&&(V=Math.abs(this._toValue-t)<=this._restDisplacementThreshold),g||k&&V?(0!==this._tension&&this._onUpdate(this._toValue),void this.__debouncedOnEnd({finished:!0})):void(this._animationFrame=N(this.onUpdate.bind(this)))}}},{key:"stop",value:function(){babelHelpers.get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"stop",this).call(this),this.__active=!1,t.cancelAnimationFrame(this._animationFrame),this.__debouncedOnEnd({finished:!1})}}]),i}(A),x=1,L=function(t){function e(t){babelHelpers.classCallCheck(this,e);var i=babelHelpers.possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i._startingValue=i._value=t,i._offset=0,i._animation=null,i._listeners={},i}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"__detach",value:function(){this.stopAnimation(),babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__detach",this).call(this)}},{key:"__getValue",value:function(){return this._value+this._offset}},{key:"__makeNative",value:function(){babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__makeNative",this).call(this),Object.keys(this._listeners).length&&this._startListeningToNativeValueUpdates()}},{key:"setValue",value:function(t){this._animation&&(this._animation.stop(),this._animation=null),this._updateValue(t,!this.__isNative),this.__isNative&&V.setAnimatedNodeValue(this.__getNativeTag(),t)}},{key:"setOffset",value:function(t){this._offset=t,this.__isNative&&V.setAnimatedNodeOffset(this.__getNativeTag(),t)}},{key:"flattenOffset",value:function(){this._value+=this._offset,this._offset=0,this.__isNative&&V.flattenAnimatedNodeOffset(this.__getNativeTag())}},{key:"extractOffset",value:function(){this._offset+=this._value,this._value=0,this.__isNative&&V.extractAnimatedNodeOffset(this.__getNativeTag())}},{key:"addListener",value:function(t){var e=String(x++);return this._listeners[e]=t,this.__isNative&&this._startListeningToNativeValueUpdates(),e}},{key:"removeListener",value:function(t){delete this._listeners[t],this.__isNative&&0===Object.keys(this._listeners).length&&this._stopListeningForNativeValueUpdates()}},{key:"removeAllListeners",value:function(){this._listeners={},this.__isNative&&this._stopListeningForNativeValueUpdates()}},{key:"_startListeningToNativeValueUpdates",value:function(){var t=this;this.__nativeAnimatedValueListener||(V.startListeningToAnimatedNodeValue(this.__getNativeTag()),this.__nativeAnimatedValueListener=p.nativeEventEmitter.addListener("onAnimatedValueUpdate",function(e){e.tag===t.__getNativeTag()&&t._updateValue(e.value,!1)}))}},{key:"_stopListeningForNativeValueUpdates",value:function(){this.__nativeAnimatedValueListener&&(this.__nativeAnimatedValueListener.remove(),this.__nativeAnimatedValueListener=null,V.stopListeningToAnimatedNodeValue(this.__getNativeTag()))}},{key:"stopAnimation",value:function(t){this.stopTracking(),this._animation&&this._animation.stop(),this._animation=null,t&&t(this.__getValue())}},{key:"resetAnimation",value:function(t){this.stopAnimation(t),this._value=this._startingValue}},{key:"interpolate",value:function(t){return new D(this,t)}},{key:"animate",value:function(t,e){var i=this,n=null;t.__isInteraction&&(n=c.createInteractionHandle());var a=this._animation;this._animation&&this._animation.stop(),this._animation=t,t.start(this._value,function(t){i._updateValue(t,!0)},function(t){i._animation=null,null!==n&&c.clearInteractionHandle(n),e&&e(t)},a,this)}},{key:"stopTracking",value:function(){this._tracking&&this._tracking.__detach(),this._tracking=null}},{key:"track",value:function(t){this.stopTracking(),this._tracking=t}},{key:"_updateValue",value:function(t,e){this._value=t,e&&s(this);for(var i in this._listeners)this._listeners[i]({value:this.__getValue()})}},{key:"__getNativeConfig",value:function(){return{type:"value",value:this._value,offset:this._offset}}}]),e}(O),j=function(t){function e(t){babelHelpers.classCallCheck(this,e);var i=babelHelpers.possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this)),n=t||{x:0,y:0};return"number"==typeof n.x&&"number"==typeof n.y?(i.x=new L(n.x),i.y=new L(n.y)):(k(n.x instanceof L&&n.y instanceof L,"AnimatedValueXY must be initalized with an object of numbers or AnimatedValues."),i.x=n.x,i.y=n.y),i._listeners={},i}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"setValue",value:function(t){this.x.setValue(t.x),this.y.setValue(t.y)}},{key:"setOffset",value:function(t){this.x.setOffset(t.x),this.y.setOffset(t.y)}},{key:"flattenOffset",value:function(){this.x.flattenOffset(),this.y.flattenOffset()}},{key:"extractOffset",value:function(){this.x.extractOffset(),this.y.extractOffset()}},{key:"__getValue",value:function(){return{x:this.x.__getValue(),y:this.y.__getValue()}}},{key:"resetAnimation",value:function(t){this.x.resetAnimation(),this.y.resetAnimation(),t&&t(this.__getValue())}},{key:"stopAnimation",value:function(t){this.x.stopAnimation(),this.y.stopAnimation(),t&&t(this.__getValue())}},{key:"addListener",value:function(t){var e=this,i=String(x++),n=function(i){i.value;t(e.__getValue())};return this._listeners[i]={x:this.x.addListener(n),y:this.y.addListener(n)},i}},{key:"removeListener",value:function(t){this.x.removeListener(this._listeners[t].x),this.y.removeListener(this._listeners[t].y),delete this._listeners[t]}},{key:"removeAllListeners",value:function(){this.x.removeAllListeners(),this.y.removeAllListeners(),this._listeners={}}},{key:"getLayout",value:function(){return{left:this.x,top:this.y}}},{key:"getTranslateTransform",value:function(){return[{translateX:this.x},{translateY:this.y}]}}]),e}(O),D=function(t){function e(t,i){babelHelpers.classCallCheck(this,e);var n=babelHelpers.possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n._parent=t,n._config=i,n._interpolation=v.create(i),n}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"__getValue",value:function(){var t=this._parent.__getValue();return k("number"==typeof t,"Cannot interpolate an input which is not a number."),this._interpolation(t)}},{key:"interpolate",value:function(t){return new e(this,t)}},{key:"__attach",value:function(){this._parent.__addChild(this)}},{key:"__detach",value:function(){this._parent.__removeChild(this),babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__detach",this).call(this)}},{key:"__transformDataType",value:function(t){return t.map(function(t){if("string"!=typeof t)return t;if(/deg$/.test(t)){var e=parseFloat(t,10)||0,i=e*Math.PI/180;return i}return parseFloat(t,10)||0})}},{key:"__getNativeConfig",value:function(){return{inputRange:this._config.inputRange,outputRange:this.__transformDataType(this._config.outputRange),extrapolateLeft:this._config.extrapolateLeft||this._config.extrapolate||"extend",extrapolateRight:this._config.extrapolateRight||this._config.extrapolate||"extend",type:"interpolation"}}}]),e}(O),U=function(t){function e(t,i){babelHelpers.classCallCheck(this,e);var n=babelHelpers.possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n._a="number"==typeof t?new L(t):t,n._b="number"==typeof i?new L(i):i,n}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"__makeNative",value:function(){this._a.__makeNative(),this._b.__makeNative(),babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__makeNative",this).call(this)}},{key:"__getValue",value:function(){return this._a.__getValue()+this._b.__getValue()}},{key:"interpolate",value:function(t){return new D(this,t)}},{key:"__attach",value:function(){this._a.__addChild(this),this._b.__addChild(this)}},{key:"__detach",value:function(){this._a.__removeChild(this),this._b.__removeChild(this),babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__detach",this).call(this)}},{key:"__getNativeConfig",value:function(){return{type:"addition",input:[this._a.__getNativeTag(),this._b.__getNativeTag()]}}}]),e}(O),S=function(t){function e(t,i){babelHelpers.classCallCheck(this,e);var n=babelHelpers.possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n._a="number"==typeof t?new L(t):t,n._b="number"==typeof i?new L(i):i,n}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"__makeNative",value:function(){babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__makeNative",this).call(this),this._a.__makeNative(),this._b.__makeNative()}},{key:"__getValue",value:function(){var t=this._a.__getValue(),e=this._b.__getValue();return 0===e&&console.error("Detected division by zero in AnimatedDivision"),t/e}},{key:"interpolate",value:function(t){return new D(this,t)}},{key:"__attach",value:function(){this._a.__addChild(this),this._b.__addChild(this)}},{key:"__detach",value:function(){this._a.__removeChild(this),this._b.__removeChild(this),babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__detach",this).call(this)}},{key:"__getNativeConfig",value:function(){return{type:"division",input:[this._a.__getNativeTag(),this._b.__getNativeTag()]}}}]),e}(O),R=function(t){function e(t,i){babelHelpers.classCallCheck(this,e);var n=babelHelpers.possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n._a="number"==typeof t?new L(t):t,n._b="number"==typeof i?new L(i):i,n}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"__makeNative",value:function(){babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__makeNative",this).call(this),this._a.__makeNative(),this._b.__makeNative()}},{key:"__getValue",value:function(){return this._a.__getValue()*this._b.__getValue()}},{key:"interpolate",value:function(t){return new D(this,t)}},{key:"__attach",value:function(){this._a.__addChild(this),this._b.__addChild(this)}},{key:"__detach",value:function(){this._a.__removeChild(this),this._b.__removeChild(this),babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__detach",this).call(this)}},{key:"__getNativeConfig",value:function(){return{type:"multiplication",input:[this._a.__getNativeTag(),this._b.__getNativeTag()]}}}]),e}(O),I=function(t){function e(t,i){babelHelpers.classCallCheck(this,e);var n=babelHelpers.possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n._a=t,n._modulus=i,n}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"__makeNative",value:function(){babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__makeNative",this).call(this),this._a.__makeNative()}},{key:"__getValue",value:function(){return(this._a.__getValue()%this._modulus+this._modulus)%this._modulus}},{key:"interpolate",value:function(t){return new D(this,t)}},{key:"__attach",value:function(){this._a.__addChild(this)}},{key:"__detach",value:function(){this._a.__removeChild(this),babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__detach",this).call(this)}},{key:"__getNativeConfig",value:function(){return{type:"modulus",input:this._a.__getNativeTag(),modulus:this._modulus}}}]),e}(O),F=function(t){function e(t,i,n){babelHelpers.classCallCheck(this,e);var a=babelHelpers.possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return a._a=t,a._min=i,a._max=n,a._value=a._lastValue=a._a.__getValue(),a}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"__makeNative",value:function(){babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__makeNative",this).call(this),this._a.__makeNative()}},{key:"interpolate",value:function(t){return new D(this,t)}},{key:"__getValue",value:function(){var t=this._a.__getValue(),e=t-this._lastValue;return this._lastValue=t,this._value=Math.min(Math.max(this._value+e,this._min),this._max),this._value}},{key:"__attach",value:function(){this._a.__addChild(this)}},{key:"__detach",value:function(){this._a.__removeChild(this),babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__detach",this).call(this)}},{key:"__getNativeConfig",value:function(){return{type:"diffclamp",input:this._a.__getNativeTag(),min:this._min,max:this._max}}}]),e}(O),M=function(t){function e(t){babelHelpers.classCallCheck(this,e);var i=babelHelpers.possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i._transforms=t,i}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"__makeNative",value:function(){babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__makeNative",this).call(this),this._transforms.forEach(function(t){for(var e in t){var i=t[e];i instanceof H&&i.__makeNative()}})}},{key:"__getValue",value:function(){return this._transforms.map(function(t){var e={};for(var i in t){var n=t[i];n instanceof H?e[i]=n.__getValue():e[i]=n}return e})}},{key:"__getAnimatedValue",value:function(){return this._transforms.map(function(t){var e={};for(var i in t){var n=t[i];n instanceof H?e[i]=n.__getAnimatedValue():e[i]=n}return e})}},{key:"__attach",value:function(){var t=this;this._transforms.forEach(function(e){for(var i in e){var n=e[i];n instanceof H&&n.__addChild(t)}})}},{key:"__detach",value:function(){var t=this;this._transforms.forEach(function(e){for(var i in e){var n=e[i];n instanceof H&&n.__removeChild(t)}}),babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__detach",this).call(this)}},{key:"__getNativeConfig",value:function(){var t=[];return this._transforms.forEach(function(e){for(var i in e){var n=e[i];n instanceof H?t.push({type:"animated",property:i,nodeTag:n.__getNativeTag()}):t.push({type:"static",property:i,value:n})}}),p.validateTransform(t),{type:"transform",transforms:t}}}]),e}(O),G=function(t){function e(t){babelHelpers.classCallCheck(this,e);var i=babelHelpers.possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t=g(t)||{},t.transform&&(t=babelHelpers.extends({},t,{transform:new M(t.transform)})),i._style=t,i}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"__walkStyleAndGetValues",value:function(t){var e={};for(var i in t){var n=t[i];n instanceof H?n.__isNative||(e[i]=n.__getValue()):n&&!Array.isArray(n)&&"object"==typeof n?e[i]=this.__walkStyleAndGetValues(n):e[i]=n}return e}},{key:"__getValue",value:function(){return this.__walkStyleAndGetValues(this._style)}},{key:"__walkStyleAndGetAnimatedValues",value:function(t){var e={};for(var i in t){var n=t[i];n instanceof H?e[i]=n.__getAnimatedValue():n&&!Array.isArray(n)&&"object"==typeof n&&(e[i]=this.__walkStyleAndGetAnimatedValues(n))}return e}},{key:"__getAnimatedValue",value:function(){return this.__walkStyleAndGetAnimatedValues(this._style)}},{key:"__attach",value:function(){for(var t in this._style){var e=this._style[t];e instanceof H&&e.__addChild(this)}}},{key:"__detach",value:function(){for(var t in this._style){var i=this._style[t];i instanceof H&&i.__removeChild(this)}babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__detach",this).call(this)}},{key:"__makeNative",value:function(){babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__makeNative",this).call(this);for(var t in this._style){var i=this._style[t];i instanceof H&&i.__makeNative()}}},{key:"__getNativeConfig",value:function(){var t={};for(var e in this._style)this._style[e]instanceof H&&(t[e]=this._style[e].__getNativeTag());return p.validateStyles(t),{type:"style",style:t}}}]),e}(O),Y=function(t){function e(t,i){babelHelpers.classCallCheck(this,e);var n=babelHelpers.possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.style&&(t=babelHelpers.extends({},t,{style:new G(t.style)})),n._props=t,n._callback=i,n.__attach(),n}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"__getValue",value:function(){var t={};for(var e in this._props){var i=this._props[e];i instanceof H?(!i.__isNative||i instanceof G)&&(t[e]=i.__getValue()):i instanceof ot?t[e]=i.__getHandler():t[e]=i}return t}},{key:"__getAnimatedValue",value:function(){var t={};for(var e in this._props){var i=this._props[e];i instanceof H&&(t[e]=i.__getAnimatedValue())}return t}},{key:"__attach",value:function(){for(var t in this._props){var e=this._props[t];e instanceof H&&e.__addChild(this)}}},{key:"__detach",value:function(){this.__isNative&&this._animatedView&&this.__disconnectAnimatedView();for(var t in this._props){var i=this._props[t];i instanceof H&&i.__removeChild(this)}babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__detach",this).call(this)}},{key:"update",value:function(){this._callback()}},{key:"__makeNative",value:function(){if(!this.__isNative){this.__isNative=!0;for(var t in this._props){var e=this._props[t];e instanceof H&&e.__makeNative()}this._animatedView&&this.__connectAnimatedView()}}},{key:"setNativeView",value:function(t){this._animatedView!==t&&(this._animatedView=t,this.__isNative&&this.__connectAnimatedView())}},{key:"__connectAnimatedView",value:function(){k(this.__isNative,'Expected node to be marked as "native"');var t=d.findNodeHandle(this._animatedView);k(null!=t,"Unable to locate attached view in the native tree"),V.connectAnimatedNodeToView(this.__getNativeTag(),t)}},{key:"__disconnectAnimatedView",value:function(){k(this.__isNative,'Expected node to be marked as "native"');var t=d.findNodeHandle(this._animatedView);k(null!=t,"Unable to locate attached view in the native tree"),V.disconnectAnimatedNodeFromView(this.__getNativeTag(),t)}},{key:"__getNativeConfig",value:function(){var t={};for(var e in this._props){var i=this._props[e];i instanceof H&&(t[e]=i.__getNativeTag())}return{type:"props",props:t}}}]),e}(H),J=function(t){function e(t,i,n,a,s){babelHelpers.classCallCheck(this,e);var o=babelHelpers.possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return o._value=t,o._parent=i,o._animationClass=n,o._animationConfig=a,o._callback=s,o.__attach(),o}return babelHelpers.inherits(e,t),babelHelpers.createClass(e,[{key:"__getValue",value:function(){return this._parent.__getValue()}},{key:"__attach",value:function(){this._parent.__addChild(this)}},{key:"__detach",value:function(){this._parent.__removeChild(this),babelHelpers.get(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"__detach",this).call(this)}},{key:"update",value:function(){this._value.animate(new this._animationClass(babelHelpers.extends({},this._animationConfig,{toValue:this._animationConfig.toValue.__getValue()
})),this._callback)}}]),e}(H),W=function(t,e){return new U(t,e)},X=function(t,e){return new S(t,e)},q=function(t,e){return new R(t,e)},z=function(t,e){return new I(t,e)},B=function(t,e,i){return new F(t,e,i)},$=function(t,e){return t&&e.onComplete?function(){e.onComplete&&e.onComplete.apply(e,arguments),t&&t.apply(void 0,arguments)}:t||e.onComplete},K=function(t,e,i){if(t instanceof j){var n=babelHelpers.extends({},e),a=babelHelpers.extends({},e);for(var s in e){var o=e[s],r=o.x,_=o.y;void 0!==r&&void 0!==_&&(n[s]=r,a[s]=_)}var l=i(t.x,n),u=i(t.y,a);return it([l,u],{stopTogether:!1})}return null},Q=function t(e,i){var n=function(t,e,i){i=$(i,e);var n=t,a=e;n.stopTracking(),e.toValue instanceof H?n.track(new J(n,e.toValue,E,a,i)):n.animate(new E(a),i)};return K(e,i,t)||{start:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){n(e,i,t)}),stop:function(){e.stopAnimation()},reset:function(){e.resetAnimation()},_startNativeLoop:function(t){var a=babelHelpers.extends({},i,{iterations:t});n(e,a)},_isUsingNativeDriver:function(){return i.useNativeDriver||!1}}},Z=function t(e,i){var n=function(t,e,i){i=$(i,e);var n=t,a=e;n.stopTracking(),e.toValue instanceof H?n.track(new J(n,e.toValue,w,a,i)):n.animate(new w(a),i)};return K(e,i,t)||{start:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){n(e,i,t)}),stop:function(){e.stopAnimation()},reset:function(){e.resetAnimation()},_startNativeLoop:function(t){var a=babelHelpers.extends({},i,{iterations:t});n(e,a)},_isUsingNativeDriver:function(){return i.useNativeDriver||!1}}},tt=function t(e,i){var n=function(t,e,i){i=$(i,e);var n=t,a=e;n.stopTracking(),n.animate(new P(a),i)};return K(e,i,t)||{start:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){n(e,i,t)}),stop:function(){e.stopAnimation()},reset:function(){e.resetAnimation()},_startNativeLoop:function(t){var a=babelHelpers.extends({},i,{iterations:t});n(e,a)},_isUsingNativeDriver:function(){return i.useNativeDriver||!1}}},et=function(t){var e=0;return{start:function(i){var n=function n(a){return a.finished?(e++,e===t.length?void(i&&i(a)):void t[e].start(n)):void(i&&i(a))};0===t.length?i&&i({finished:!0}):t[e].start(n)},stop:function(){e<t.length&&t[e].stop()},reset:function(){t.forEach(function(t,i){i<=e&&t.reset()}),e=0},_startNativeLoop:function(){throw new Error("Loops run using the native driver cannot contain Animated.sequence animations")},_isUsingNativeDriver:function(){return!1}}},it=function(t,e){var i=0,n={},a=!(e&&e.stopTogether===!1),s={start:function(e){return i===t.length?void(e&&e({finished:!0})):void t.forEach(function(o,r){var _=function(o){return n[r]=!0,i++,i===t.length?(i=0,void(e&&e(o))):void(!o.finished&&a&&s.stop())};o?o.start(_):_({finished:!0})})},stop:function(){t.forEach(function(t,e){!n[e]&&t.stop(),n[e]=!0})},reset:function(){t.forEach(function(t,e){t.reset(),n[e]=!1,i=0})},_startNativeLoop:function(){throw new Error("Loops run using the native driver cannot contain Animated.parallel animations")},_isUsingNativeDriver:function(){return!1}};return s},nt=function(t){return Z(new L(0),{toValue:0,delay:t,duration:0})},at=function(t,e){return it(e.map(function(e,i){return et([nt(t*i),e])}))},st=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=e.iterations,n=void 0===i?-1:i,a=!1,s=0;return{start:function(e){var i=function i(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{finished:!0};a||s===n||o.finished===!1?e&&e(o):(s++,t.reset(),t.start(i))};t&&0!==n?t._isUsingNativeDriver()?t._startNativeLoop(n):i():e&&e({finished:!0})},stop:function(){a=!0,t.stop()},reset:function(){s=0,a=!1,t.reset()},_startNativeLoop:function(){throw new Error("Loops run using the native driver cannot contain Animated.loop animations")},_isUsingNativeDriver:function(){return t._isUsingNativeDriver()}}},ot=function(){function t(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};babelHelpers.classCallCheck(this,t),this._listeners=[],this._argMapping=e,i.listener&&this.__addListener(i.listener),this._callListeners=this._callListeners.bind(this),this._attachedEvent=null,this.__isNative=a(i)}return babelHelpers.createClass(t,[{key:"__addListener",value:function(t){this._listeners.push(t)}},{key:"__removeListener",value:function(t){this._listeners=this._listeners.filter(function(e){return e!==t})}},{key:"__attach",value:function(t,e){k(this.__isNative,"Only native driven events need to be attached."),this._attachedEvent=l(t,e,this._argMapping)}},{key:"__detach",value:function(t,e){k(this.__isNative,"Only native driven events need to be detached."),this._attachedEvent&&this._attachedEvent.detach()}},{key:"__getHandler",value:function(){var t=this;return this.__isNative?this._callListeners:function(){for(var e=arguments.length,i=Array(e),n=0;n<e;n++)i[n]=arguments[n];var a=function t(e,i,n){if("number"==typeof i&&e instanceof L)e.setValue(i);else if("object"==typeof e)for(var a in e)t(e[a],i[a],a)};t.__isNative||t._argMapping.forEach(function(t,e){a(t,i[e],"arg"+e)}),t._callListeners.apply(t,i)}}},{key:"_callListeners",value:function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];this._listeners.forEach(function(t){return t.apply(void 0,e)})}},{key:"_validateMapping",value:function(){}}]),t}(),rt=function(t,e){var i=new ot(t,e);return i.__isNative?i:i.__getHandler()};i.exports={Value:L,ValueXY:j,Interpolation:D,decay:tt,timing:Z,spring:Q,add:W,divide:X,multiply:q,modulo:z,diffClamp:B,delay:nt,sequence:et,parallel:it,stagger:at,loop:st,event:rt,createAnimatedComponent:_,attachNativeEvent:l,forkEvent:u,unforkEvent:h,__PropsOnlyForTests:Y}},279);