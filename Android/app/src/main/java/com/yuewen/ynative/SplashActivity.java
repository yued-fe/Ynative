package com.yuewen.ynative;

import android.app.Activity;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.provider.Settings;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactApplication;

public class SplashActivity extends ReactActivity {

    private static final int ALERT_WINDOW_PERMISSION_CODE = 100;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= 23) {
            if (Settings.canDrawOverlays(this)) {
                SplashScreen.show(this,true);
                Handler x = new Handler();
                x.postDelayed(new splashhandler(), 3000);
                ReactPreLoader.init(this, MyRnActivity.reactInfo);//这里预加载rn
            }else{
                //Toast.makeText(SplashActivity.this, "当前无权限使用悬浮窗，请授权！", Toast.LENGTH_SHORT).show();
                Intent serviceIntent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
                startActivityForResult(serviceIntent,ALERT_WINDOW_PERMISSION_CODE);
            }
        }
    }
    class splashhandler implements Runnable{
        public void run() {
            startActivity(new Intent(getApplication(),MyRnActivity.class));
            SplashActivity.this.finish();
        }
    }
    // startActivityForResultd的回调
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == ALERT_WINDOW_PERMISSION_CODE) {
            if (Build.VERSION.SDK_INT >= 23) {
                if (Settings.canDrawOverlays(this)) {
                    SplashScreen.show(this,true);
                    Handler x = new Handler();
                    x.postDelayed(new splashhandler(), 4000);
                    ReactPreLoader.init(this, MyRnActivity.reactInfo);//这里预加载rn
                } else {
                    Toast.makeText(SplashActivity.this, "权限授予失败，无法开启悬浮窗", Toast.LENGTH_SHORT).show();
                }
            }
        }
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ynative";
    }
}
