package com.yuewen.ynative;

import android.app.Activity;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactApplication;

public class HomeActivity extends ReactActivity {

    private static final int ALERT_WINDOW_PERMISSION_CODE = 100;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= 23) {
            if (Settings.canDrawOverlays(this)) {
                SplashScreen.show(this,true);
            }else{
                Toast.makeText(HomeActivity.this, "当前无权限使用悬浮窗，请授权！", Toast.LENGTH_SHORT).show();
                Intent serviceIntent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
                startActivityForResult(serviceIntent,ALERT_WINDOW_PERMISSION_CODE);
            }
        }
    }

    // startActivityForResultd的回调
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == ALERT_WINDOW_PERMISSION_CODE) {
            if (Build.VERSION.SDK_INT >= 23) {
                if (Settings.canDrawOverlays(this)) {
                    SplashScreen.show(this,true);
                    //TODO:回退有bug 离线就不会有这个bug
                    Intent intent = new Intent(this,HomeActivity.class);
                    startActivity(intent);
                    HomeActivity.this.finish();
                } else {
                    Toast.makeText(HomeActivity.this, "权限授予失败，无法开启悬浮窗", Toast.LENGTH_SHORT).show();
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
