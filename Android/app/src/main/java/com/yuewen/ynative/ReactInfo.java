package com.yuewen.ynative;

import android.os.Bundle;

/**
 * {@link ReactInfo} describes a ReactActivity's necessary information.
 */
public class ReactInfo {

    private String mMainComponentName;
    private Bundle mLaunchOptions;

    public ReactInfo(String mainComponentName) {
        mMainComponentName = mainComponentName;
    }

    public ReactInfo(String mainComponentName, Bundle launchOptions) {
        mMainComponentName = mainComponentName;
        mLaunchOptions = launchOptions;
    }

    public Bundle getLaunchOptions() {
        return mLaunchOptions;
    }

    public String getMainComponentName() {
        return mMainComponentName;
    }
}