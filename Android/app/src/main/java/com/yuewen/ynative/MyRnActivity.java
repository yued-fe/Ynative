package com.yuewen.ynative;



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