import {TabNavigator, TabBarTop} from 'react-navigation';

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
  tabBarComponent: TabBarTop,
  animationEnabled: true,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#3b5998',
    inactiveTintColor: '#bababa',

    style: {
      backgroundColor: '#ffffff',
      borderTopWidth: 0,
      elevation: 8,
      shadowColor: '#000',
      shadowOpacity: 0.5,
      shadowRadius: 3,
      shadowOffset: {
        height: 3
      },
      zIndex: 1
    },
    indicatorStyle: {
      backgroundColor: '#3b5998'
    }
  }
})
