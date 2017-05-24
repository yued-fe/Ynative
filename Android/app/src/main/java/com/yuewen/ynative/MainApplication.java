package com.yuewen.ynative;

import android.app.Application;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.io.File;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNJavaReactPackage()//<-- 添加这一行，类名替换成你的Package类的名字.
            );
        }
        @Nullable
        @Override
        protected String getJSBundleFile() {
            //优先访问我们设定的目录，没有再默认去assets
            File bundleFile = new File(getExternalCacheDir()+"/offline","index.android.bundle");
            if(bundleFile.exists()){
                System.out.println("MainApplication +++++ "+bundleFile.getAbsolutePath());
                return bundleFile.getAbsolutePath();
            }
            return super.getJSBundleFile();
        }
    };


    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
