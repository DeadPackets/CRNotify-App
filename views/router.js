import {TabNavigator, TabBarTop} from 'react-navigation';

import InfoScreen from './InfoScreen';
import ManageScreen from './ManageScreen';
import FAQScreen from './FAQScreen';
import CreditScreen from './credits';

export const Router = TabNavigator({
  Info: {
    screen: InfoScreen
  },
  Manage: {
    screen: ManageScreen
  },
  FAQ: {
    screen: FAQScreen
  },
  Credits: {
    screen: CreditScreen
  }
}, {
  tabBarPosition: 'bottom',
  tabBarComponent: TabBarTop,
  animationEnabled: true,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#3b5998',
    inactiveTintColor: '#838383',
    labelStyle: {
      fontSize: 11,
    },
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
