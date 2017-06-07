package com.yuewen.ynative;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.Toast;

import com.facebook.react.JSCConfig;
import com.facebook.react.ReactApplication;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactInstanceManagerBuilder;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;


public class MyPureRnActivity extends Activity implements DefaultHardwareBackBtnHandler {


    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;
    private static final int ALERT_WINDOW_PERMISSION_CODE = 100;


    public static void startActivity(Context context){
        Intent intent = new Intent(context, MyPureRnActivity.class);
        context.startActivity(intent);
    }
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getUseDeveloperSupport() && Build.VERSION.SDK_INT >= 23) {
            if (Settings.canDrawOverlays(this)) {
                SplashScreen.show(this,true);
                loadapp();
            }else{
                Toast.makeText(MyPureRnActivity.this, "当前无权限使用悬浮窗，请授权！", Toast.LENGTH_SHORT).show();
                Intent serviceIntent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
                startActivityForResult(serviceIntent,ALERT_WINDOW_PERMISSION_CODE);
            }
        } else {
            loadapp();
        }

    }
    protected void loadapp(){
        mReactRootView = new ReactRootView(this);
        ReactInstanceManagerBuilder builder = ReactInstanceManager.builder()
                .setApplication(getApplication())
                //.setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new RNJavaReactPackage())
                .setUseDeveloperSupport(true)
                .setInitialLifecycleState(LifecycleState.RESUMED);

        File bundleFile = new File(getExternalCacheDir(),"offline/index.android.bundle");
        if(bundleFile.exists()){
            builder.setJSBundleFile(bundleFile.getAbsolutePath());
        } else {
            builder.setBundleAssetName("index.android.bundle");
        }
        mReactInstanceManager = builder.build();
        mReactRootView.startReactApplication(mReactInstanceManager, "ynative", null);
        setContentView(mReactRootView);
    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == ALERT_WINDOW_PERMISSION_CODE) {
            if (getUseDeveloperSupport() && Build.VERSION.SDK_INT >= 23) {
                if (Settings.canDrawOverlays(this)) {
                    SplashScreen.show(this,true);
                    loadapp();
                } else {
                    Toast.makeText(MyPureRnActivity.this, "权限授予失败，无法开启悬浮窗", Toast.LENGTH_SHORT).show();
                }
            }
        }
    }
    @Override
    protected void onResume() {
        super.onResume();

        if(mReactInstanceManager != null){
            mReactInstanceManager.onHostResume(this, this);
        }
    }

    @Override
    protected void onPause() {
        super.onPause();

        if(mReactInstanceManager != null){
            mReactInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        //unregisterReceiver(receiver); //和updateJsBundle()同步开关
        if(mReactInstanceManager != null){
            mReactInstanceManager.onHostDestroy();
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        if(mReactInstanceManager != null){
            mReactInstanceManager.onBackPressed();
        }else{
            super.onBackPressed();
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }
    //我们需要改动一下开发者菜单。
    //默认情况下，任何开发者菜单都可以通过摇晃或者设备类触发，不过这对模拟器不是很有用。
    //所以我们让它在按下Menu键的时候可以显示
    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }
}

