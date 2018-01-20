package com.crnotify;

//import android.os.Bundle; // react-native-splash-screen
import com.facebook.react.ReactActivity;
import com.react.rnspinkit.RNSpinkitPackage;
//import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "CRNotify";
    }

    //react-native-splash-screen
    // @Override
    // protected void onCreate(Bundle savedInstanceState) {
    //     SplashScreen.show(this);  // here
    //     super.onCreate(savedInstanceState);
    // }
}
