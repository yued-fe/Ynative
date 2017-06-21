# Ynative
## 简介
Ynative是一个原生壳子，希望实现原生代码和RN、Hybrid的混合开发。
## 如何运行

1、[React-Native开发环境搭建](https://facebook.github.io/react-native/docs/getting-started.html)

2、clone Ynative

3、cd Ynative && cd IOS || Android && npm install

4、run

### debug模式
在项目根目录(IOS或Android文件夹下)执行
```
npm start
```
#### IOS
两种运行方式：
- 在根目录执行react-native run-ios
- 或者使用Xcode来编译运行
#### Android
两种运行方式：
- 打开模拟器，在根目录执行./gradlew installDebug
- 或者使用Android Studio来编译运行

### 离线模式
#### IOS
打包(如果bundle目录不存在，需要提前创建一个)
```
react-native bundle --platform ios --dev false --entry-file index.ios.js --bundle-output ios/bundle/index.ios.jsbundle --assets-dest ios/bundle
```
将 assets 和 index.ios.jsbundle 引入工程
>注意: assets 目录导入工程中时，要选择 Create folder references，因为这是图片素材(直接将bundle下的assert和index.ios.jsbundle拖入项目，会弹出选项)。

修改AppDelegate中的代码
```
NSURL *jsCodeLocation;
jsCodeLocation = [NSURL URLWithString:[[NSBundle mainBundle] pathForResource:@"index.ios.jsbundle" ofType:nil]];
RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                    moduleName:@"RNBundleDemo"
                                             initialProperties:nil
                                                 launchOptions:launchOptions];
```
两种运行方式：
- 在根目录执行react-native run-ios
- 或者使用Xcode来编译运行
#### Android
打包(如果assets目录不存在，需要提前创建一个)
```
react-native unbundle --platform android --dev false --entry-file index.android.js --bundle-output app/src/main/assets/index.android.bundle --assets-dest app/src/main/res/
```
两种运行方式：
- 打开模拟器，在根目录执行./gradlew installDebug
- 或者使用Android Studio来编译运行

## RN目标能力
- [x] React-Native开发环境搭建
- [x] RN嵌入到现有Android原生应用
- [ ] RN嵌入到现有IOS原生应用
- [x] RN调用Android原生应用方法
- [ ] RN调用IOS原生应用方法
- [x] RN热更新的实现(Android)
- [ ] RN热更新的实现(IOS)
- [x] RN bundle优化(Android使用Unbundle)
- [ ] RN bundle优化(IOS使用prepack)
- [ ] RN打包工具制作
- [x] RN差量更新
- [x] RN白屏优化(Android)
- [ ] RN组件的扩展（UI、API）
- [x] RN状态管理的优化（Redux）
- [ ] RN布局的优化（ListView的优化）
## Hybrid目标能力
- [ ] 原生应用加入WebView支持
- [ ] WebView开启支持JavaScript
- [ ] JSSDK建设
- [ ] Hybrid的热更新
## 项目布局

```
.
├── IOS                                          // 详细见目录内的README
├── Android                                      // 详细见目录内的README
├── ScreenShot                                   // 用于存放项目截图、MD文档图片

```
