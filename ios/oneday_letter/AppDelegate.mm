#import "AppDelegate.h"
#import <FirebaseCore.h>
#import <Firebase.h>
#import <FirebaseMessaging.h>

#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h"
#import <RNKakaoLogins.h>
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  
  self.moduleName = @"oneday_letter";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  bool didFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];
  
  [RNSplashScreen show];    //추가
  
  
//  if ([FIRApp defaultApp] == nil) {
//
//      [FIRApp configure];
//
//    }
  
  return didFinish;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  // naver
  if ([url.scheme isEqualToString:@"naverP8fw62V8vrNgmxOO4vRf"]) {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application: application openURL: url options: options];
  }
  
  if ([RNKakaoLogins isKakaoTalkLoginUrl: url]) {
    return [RNKakaoLogins handleOpenUrl: url];
  }

 return NO;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
