__d(function(e,n,r,t){"use strict";var a=n(17).DeviceEventManager,i=n(31),o="hardwareBackPress",s=new Set;i.addListener(o,function(){for(var e=new Set(s),n=!0,r=[].concat(babelHelpers.toConsumableArray(e)).reverse(),t=0;t<r.length;++t)if(r[t]()){n=!1;break}n&&v.exitApp()});var v={exitApp:function(){a.invokeDefaultBackPressHandler()},addEventListener:function(e,n){return s.add(n),{remove:function(){return v.removeEventListener(e,n)}}},removeEventListener:function(e,n){s.delete(n)}};r.exports=v},358);