import React from 'react';
import './shim.js';
import MainBottomTabs from './MainBottomTabs';
import { Sentry } from 'react-native-sentry';
import { AppRegistry } from 'react-native';
import WalletMigrate from './screen/wallets/walletMigrate';
import { name as appName } from './app.json';
/** @type {AppStorage} */
const BlueApp = require('./BlueApp');
if (process.env.NODE_ENV !== 'development') {
  Sentry.config('https://23377936131848ca8003448a893cb622@sentry.io/1295736').install();
}

if (!Error.captureStackTrace) {
  // captureStackTrace is only available when debugging
  Error.captureStackTrace = () => {};
}

class BlueAppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMigratingData: true };
  }

  async setIsMigratingData() {
    await BlueApp.startAndDecrypt();
    this.setState({ isMigratingData: false });
  }

  render() {
    return this.state.isMigratingData ? <WalletMigrate onComplete={() => this.setIsMigratingData()} /> : <MainBottomTabs />;
  }
}

AppRegistry.registerComponent(appName, () => BlueAppComponent);
