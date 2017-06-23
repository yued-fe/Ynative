# Android

## 说明

1、嵌入现有原生应用（已加入）

2、预加载（已加入）

3、调用原生应用方法（用到时加入）

4、热更新（用到时加入）

5、Redux (已加入)


## 项目布局

```
.
├── app                                                      //安卓原生代码目录
│   └── src
│       └── main
│           ├── AndroidManifest.xml                          //一些基本声明（包名，权限，资源命名空间等）
│           ├── assets                                       //RN离线文件默认文件夹
│           │   ├── index.android.bundle                     //打包后的离线bundle
│           │   └── js-modules                               //使用unbundle打包后生成的js-modules，存放了所有公共的JS
│           │       ├── 443.js                              
│           │       └── UNBUNDLE
│           ├── java
│           │   └── com
│           │       └── yuewen
│           │           └── ynative
│           │               ├── BaseActivity.java           //重写ReactActivity，加入预加载bundle的能力    
│           │               ├── MainActivity.java           //Android程序入口
│           │               ├── MainApplication.java        //实例化RNJavaReactPackage中注册的模块
│           │               ├── MyRnActivity.java           //RN入口文件(首页是native)，继承BaseActivity
│           │               ├── RNJavaReactPackage.java     //注册原生提供给RN用的模块
│           │               ├── ReactInfo.java              //预加载相关的bean文件
│           │               ├── ReactPreLoader.java         //预加载实现代码
│           │               ├── SplashScreen.java           //伪启动图预加载bundle实现
│           │               ├── SplashScreenModule.java     //伪启动图预加载bundle方法
│           │               ├── HomeActivity.java           //首页是RN(方案一)
│           │               ├── SplashActivity.java         //首页是RN(方案二)
│           │               └── MyPureRnActivity.java       //首页是RN(方案三，目前这个方案最好，若要启动页效果更稳定加上延时即可)
│           └── res                                         //资源文件
│               ├── drawable
│               ├── layout                                  //布局文件
│               │   ├── activity_main.xml
│               │   └── launch_screen.xml
│               │    
│               ├── mipmap-hdpi                             //支持ic_launcher_round.png(圆形)和ic_launcher.png(方形)，推荐像素72*72
│               │   └── ic_launcher.png
│               ├── mipmap-mdpi                             //同上，推荐像素48*48
│               │   └── ic_launcher.png
│               ├── mipmap-xhdpi                            //同上，推荐像素96*96
│               │   └── ic_launcher.png
│               ├── mipmap-xxhdpi                           //同上，推荐像素144*144
│               │   └── ic_launcher.png
│               ├── mipmap-xxxhdpi                          //同上，推荐像素192*192
│               │   └── ic_launcher.png
│               └── values                       
│                   ├── colors.xml                          
│                   ├── strings.xml
│                   └── styles.xml
├── index.android.js                                       //Android RN程序入口
└── js                                                     //RN js代码，理论上IOS和Android共用一套
    ├── actions                                            //Redux actions相关文件夹，理论上一个页面对应一个actions
    │   ├── actionTypes.js                                 //存放所有action的名称
    │   └── requestIndexData.js                            //首页action，用于把事件的要素提供给reducer，action本身不修改state值
    ├── animation                                          //动画
    │   └── myNavigatorScene.js                            //首页转场动画
    ├── api                                                //api相关文件夹
    │   └── api.js                                         //存放所有的请求地址
    ├── app.js                                             //合并了IOS和Android的入口。用Provider作为state的顶层分发，cover到所有组件。
    ├── components                                         //公共的组件写在这个文件夹
    │   └── backPageComponent.js                           //用于监听安卓回退的组件，理论上二级页面都可继承
    ├── native_modules                                     //这里放RN与原生打交道的接口
    │   └── splashScreen.js                                //利用启动图解决首次加载慢的问题
    ├── page                                               //这里编写我们的页面
    │   ├── index.js                                       //首页
    │   └── rank.js                                        //排行榜页
    ├── persistence                                        //用于请求的本地缓存（待完善）
    │   └── indexLocalData.js                              //首页的本地缓存处理
    ├── reducers                                           //匹配action类型，修改state值
    │   ├── index.js                                       //合并目录下所有的reducers
    │   └── indexDataState.js                              //首页的reducers
    ├── res                                                //资源存放文件夹
    │   └── logo.png
    ├── store                                              //负责存储状态，是action和reducers的桥梁
    │   └── index.js
    ├── test.js                                            //测试页面，忽略
    └── utils                                              //公共方法写在这里
        ├── fetchUtil.js                                   //对fetch封装（待完善）
        ├── formatUtil.js                                  //提供日期、字符转换
        ├── toastUtil.js                                   //提供简易弹层
        ├── pxtodpUtil.js                                  //将像素（PX）转成DP
        └── themeUtil.js                                   //主题统一管理
```
## Redux
开发用到redux、react-redux,需要对流程有个大概的了解:
- 如果只使用redux，那么流程是这样的：

> component --> dispatch(action) --> reducer --> subscribe --> getState --> component

![](https://github.com/yued-fe/Ynative/blob/master/ScreenShot/redux.jpg)

- 用了react-redux之后流程是这样的：

> component --> actionCreator(data) --> reducer --> component

![](https://github.com/yued-fe/Ynative/blob/master/ScreenShot/react-redux.png)

具体文档可以参见
- [Redux中文](http://cn.redux.js.org/index.html)
- [react-redux中文](http://cn.redux.js.org/docs/react-redux/api.html)
- [Redux英文](http://redux.js.org/)
- [react-redux中文](http://redux.js.org/docs/api/)
