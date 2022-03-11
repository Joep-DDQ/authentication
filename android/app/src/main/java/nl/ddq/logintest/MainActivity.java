package nl.ddq.logintest;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import android.os.Bundle; // required for onCreate parameter

import java.util.ArrayList;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      registerPlugin(GoogleAuth.class);
  }
}
