import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'nl.ddq.logintest',
  appName: 'LoginTest',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      /*serverClientId: '429628421623-adhp197n2c0hqu1tc02sh4lau5gcr3ge.apps.googleusercontent.com', test key for web*/
      serverClientId: '429628421623-urbs09cpeuffscsim3j8hn3ism7f7n01.apps.googleusercontent.com', /* test key for android */
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
