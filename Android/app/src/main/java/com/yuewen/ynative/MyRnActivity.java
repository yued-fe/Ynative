package com.yuewen.ynative;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;

public class MyRnActivity extends BaseActivity {

    public static final ReactInfo reactInfo = new ReactInfo("ynative", null);

    @Override
    protected String getMainComponentName() {
        return reactInfo.getMainComponentName();
    }

    @Override
    public ReactInfo getReactInfo() {
        return reactInfo;
    }
}