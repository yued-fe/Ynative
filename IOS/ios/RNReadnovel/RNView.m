//
//  RNView.m
//  RNReadnovel
//
//  Created by 周文康 on 2017/6/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RNView.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@interface RNView ()

@end

@implementation RNView

- (void)viewDidLoad {
  [super viewDidLoad];
  
  self.view.backgroundColor = [UIColor whiteColor];
  
  self.navigationItem.title = @"我是ReactNative页面呦~";
  
  NSURL *jsCodeLocation;
  
  
  NSString * strUrl = @"http://localhost:8081/index.ios.bundle?platform=ios&dev=true";
  
  jsCodeLocation = [NSURL URLWithString:strUrl];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"RNReadnovel"
                                               initialProperties:nil
                                                   launchOptions:nil];
//                                               initialProperties:@{
//                                                                   
//                                                                   @"launchOptions":@{
//                                                                       @"componentName":@"IndexPage"
//                                                                       }
//                                                                   }
  self.view = rootView;
  
}


@end
