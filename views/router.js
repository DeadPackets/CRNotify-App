import {TabNavigator} from 'react-navigation';

import InfoScreen from './InfoScreen';
import ManageScreen from './ManageScreen';

export const Router = TabNavigator({
  Info: {
    screen: InfoScreen
  },
  Manage: {
    screen: ManageScreen
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#0069bf',
    showIcon: true
  }
})
