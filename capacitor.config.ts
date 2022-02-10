import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'nl.ddq.minisecchi',
  appName: 'Mini-Secchi',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '429628421623-adhp197n2c0hqu1tc02sh4lau5gcr3ge.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
