package com.yuewen.ynative;

import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.view.View.OnClickListener;
import android.content.Intent;
import android.view.View;
import android.provider.Settings;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    private Button button = null;
    private static final int ALERT_WINDOW_PERMISSION_CODE = 100;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        button = (Button)findViewById(R.id.rn_button);
        button.setOnClickListener(new MyButtonListener());
        if (Build.VERSION.SDK_INT >= 23) {
            if (Settings.canDrawOverlays(this)) {
                ReactPreLoader.init(this, MyRnActivity.reactInfo);//这里预加载rn
            }else{
                Toast.makeText(MainActivity.this, "当前无权限使用悬浮窗，请授权！", Toast.LENGTH_SHORT).show();
                Intent serviceIntent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
                startActivityForResult(serviceIntent,ALERT_WINDOW_PERMISSION_CODE);
            }
        }
    }
    // startActivityForResultd的回调
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == ALERT_WINDOW_PERMISSION_CODE) {
            if (Build.VERSION.SDK_INT >= 23) {
                if (Settings.canDrawOverlays(this)) {
                    ReactPreLoader.init(this, MyRnActivity.reactInfo);//这里预加载rn
                } else {
                    Toast.makeText(MainActivity.this, "权限授予失败，无法开启悬浮窗", Toast.LENGTH_SHORT).show();
                }
            }
        }
    }

    class MyButtonListener implements OnClickListener{
        public void onClick(View v) {
            switch (v.getId()) {
                case R.id.rn_button:
                    if (Build.VERSION.SDK_INT >= 23) {
                        if(!Settings.canDrawOverlays(MainActivity.this)) {
                            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
                            startActivity(intent);
                            return;
                        } else {
                            //绘ui代码, 这里说明6.0系统已经有权限了
                        }
                    } else {
                        //绘ui代码,这里android6.0以下的系统直接绘出即可
                    }
                    Intent intent = new Intent(MainActivity.this,MyRnActivity.class);//调用rn的入口
                    startActivity(intent);
                    break;
            }
        }
    }
}
