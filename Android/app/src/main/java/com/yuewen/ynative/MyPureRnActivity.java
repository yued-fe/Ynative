package com.yuewen.ynative;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class MyPureRnActivity extends ReactActivity {

//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        SplashScreen.show(this, true);
//        super.onCreate(savedInstanceState);
//    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ynative";
    }
}
