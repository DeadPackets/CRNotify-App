import React, {Component} from 'react';
import {
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Linking,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Header, List, ListItem, Button, Divider, Card, SocialIcon, Icon as IconReal} from 'react-native-elements';
import {TabNavigator} from 'react-navigation';

export default class Info extends Component {
  constructor(props) {
    super(props)
  }

  openFAQ() {
  }

  static navigationOptions = {
    tabBarLabel: 'Credits',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({tintColor}) => (<Icon name="address-book" size={25} color={tintColor}/>)
  };

  render() {
    return (<View style={{backgroundColor: '#ffffff', flex: 1}}>
      <Header centerComponent={{
              text: 'CRNotify',
              style: {
                color: '#fff',
                fontSize: 24,
                fontWeight: '900'
              }
            }}
            rightComponent={<Icon size={24} name="sign-out" color="#ffffff" type="font-awesome" onPress={this.props.screenProps.logOut}/>}
          />
      <ScrollView>
        <Text style={styles.creditsMainTitle}>Credits</Text>
        <Card
          title='About Me'
          image={{uri: 'https://pbs.twimg.com/profile_banners/3227225700/1502817423/1500x500'}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>
            <SocialIcon raised={true} type='twitter' onPress={()=>{Linking.openURL('https://twitter.com/dead_packets')}}/>
            <SocialIcon raised={true} type='instagram' onPress={()=>{Linking.openURL('https://instagram.com/lucidgamer')}}/>
            <SocialIcon raised={true} type='github' onPress={()=>{Linking.openURL('https://github.com/DeadPackets')}}/>
            <SocialIcon raised={true} type='wordpress' onPress={()=>{Linking.openURL('https://blog.deadpackets.cf/')}}/>
            <SocialIcon raised={true} type='facebook' onPress={()=>{Linking.openURL('https://facebook.com/DeadPackets')}}/>
            <IconReal raised={true} reverse={true} name='whatsapp' type='font-awesome' color='#25D366' onPress={()=>{Linking.openURL('https://api.whatsapp.com/send?phone=971507399008')}}/>
            <IconReal raised={true} reverse={true} name='telegram' type='font-awesome' color='#0088cc' onPress={()=>{Linking.openURL('https://t.me/DeadPackets')}}/>
            <IconReal raised={true} reverse={true} name='snapchat-ghost' type='font-awesome' iconStyle={styles.snapchatIcon} color='#fffc00' onPress={()=>{Linking.openURL('https://snapchat.com/add/shadowblade7536')}}/>
            <IconReal raised={true} reverse={true} name='paypal' type='font-awesome' color='#003087' onPress={()=>{Linking.openURL('https://paypal.me/DeadPackets')}}/>
            <IconReal raised={true} reverse={true} name='envelope' type='font-awesome' color='#3469df' onPress={()=>{Linking.openURL('mailto:b00073615@aus.edu')}}/>
              <Divider />
            <Text style={{textAlign: 'center', fontSize: 24, paddingVertical: 20}}>Support me and this project!</Text>
            <Button title="Sure!" style={{paddingBottom: 20}} large={true} rounded={true} backgroundColor="#1d46af" onPress={() => {Linking.openURL('https://crnotify.cf/donate')}}></Button>
          </View>
        </Card>
        <Card
          title='About this app'>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Text>This app was built using ReactNative, a framework by Facebook. It uses a bunch of libraries for all sorts of things including the UI itself, the navigation bar below, and even the popups. Cheers to all the devs who, thanks to their work, made this app possible.</Text>
          </View>
        </Card>

        <Text style={styles.footer}>Built and Programmed by Youssef Awad aka DeadPackets</Text>
      </ScrollView>
    </View>)
  }
}

const styles = StyleSheet.create({
  creditsMainTitle: {
    fontSize: 48,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 20
  },
  snapchatIcon: {
    shadowColor: '#000',
    shadowOpacity: 0.7,
    shadowRadius: 1,
    shadowOffset: {
      height: 1
    },
    zIndex: 1
  },
  codeTag: {
    fontFamily: 'Courier New',
    backgroundColor: '#F9F9F9',
    padding: 6
  },
  footer: {
    color: '#a4a4a4',
    textAlign: 'center',
    padding: 20,
    fontSize: 22,
    fontWeight: "200"
  }
});
