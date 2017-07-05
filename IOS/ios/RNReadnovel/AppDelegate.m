/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>
#import "AppDelegate.h"
#import "SplashScreen.h"
#import "AdImageTool.h"
#import "AdvertiseView.h"
#import "AdvertiseViewController.h"//广告跳转页
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  
  //jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  jsCodeLocation = [NSURL URLWithString:[[NSBundle mainBundle] pathForResource:@"index.ios.jsbundle" ofType:nil]];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"RNReadnovel"
                                                      initialProperties:nil
                                                      launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  // 初始化Nav 用于跳转到native
  _nav = [[UINavigationController alloc]initWithRootViewController:rootViewController];
  _nav.navigationBarHidden = YES;
  self.window.rootViewController = _nav;
  //self.window.rootViewController = rootViewController;
  [NSThread sleepForTimeInterval:2.0];//启动图显示时间
  [self.window makeKeyAndVisible];
  
  // 判断沙盒中是否存在广告图片，如果存在，直接显示
  NSString *filePath = [AdImageTool getFilePathWithImageName:[kUserDefaults valueForKey:adImageName]];
  BOOL isExist = [AdImageTool isFileExistWithFilePath:filePath];
  if (isExist) {// 图片存在
    AdvertiseView *advertiseView = [[AdvertiseView alloc] initWithFrame:self.window.bounds];
    advertiseView.filePath = filePath;
    [advertiseView show];
  } else {
    [SplashScreen show];//启动图争取加载时间
  }
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(pushToAd) name:@"pushtoad" object:nil];
  [AdImageTool getAdvertisingImage];//判断广告是否更新
  //[SplashScreen show];
  return YES;
}

- (void)pushToAd {
  //    NSString *url = [SystemInfo getSystemInfoFoKey:@"LAUNCH_INTENT_URL"];//判断是否有需要跳转的广告页
  //    if (url.length > 0) {
  AdvertiseViewController *adVc = [[AdvertiseViewController alloc] init];
  //        adVc.adUrl = url;
  //[self.navigationController pushViewController:adVc animated:YES];
  //    }
  ;
  
  AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  
  [app.nav pushViewController:adVc animated:YES];
  
}

@end
