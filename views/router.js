import {TabNavigator} from 'react-navigation';

import InfoScreen from './InfoScreen';
import ManageScreen from './ManageScreen';
import FAQScreen from './FAQScreen';

export const Router = TabNavigator({
  Info: {
    screen: InfoScreen
  },
  Manage: {
    screen: ManageScreen
  },
  FAQ: {
    screen: FAQScreen
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#0069bf',
    showIcon: true
  }
})
