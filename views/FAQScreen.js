import React, {Component} from 'react';
import {
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Linking,
  Text,
  View
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header, List, ListItem, Button, Divider} from 'react-native-elements';
import {TabNavigator} from 'react-navigation';

export default class Info extends Component {
  constructor(props) {
    super(props)
  }

  openFAQ() {
  }

  static navigationOptions = {
    tabBarLabel: 'FAQ',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({tintColor}) => (<Icon name="question" size={25} color={tintColor}/>)
  };

  render() {
    return (<View style={{backgroundColor: '#ffffff', flex: 1}}><Header centerComponent={{
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
        <Text style={styles.faqMainTitle}>Freq. Asked Questions</Text>
        <Text style={styles.faqTitle}>Before we start, read the main FAQ first.</Text>
        <Button title="Take me there!" style={{paddingBottom: 20}} small={true} backgroundColor="#1d46af" onPress={() => {Linking.openURL('https://crnotify.cf/faq')}}></Button>
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Divider />
        </View>
        <Text style={styles.faqTitle}>What does this app do?</Text>
        <Text style={styles.faqParagraph}>Its literally just an interface between you and CRNotify. Saves you time from opening the browser.</Text>
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Divider />
        </View>
        <Text style={styles.faqTitle}>Does that mean I'll get notifications on my phone?</Text>
        <Text style={styles.faqParagraph}>Nope, sorry. I'm not gonna pay 50 dollars for mobile notifications :/</Text>
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Divider />
        </View>
        <Text style={styles.faqTitle}>How can I trust you aren't spying on me?</Text>
        <Text style={styles.faqParagraph}>First, this app didn't ask for any special permissions. Second, the app is Open Source, meaning you can go read the code yourself if you don't believe me.</Text>
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Divider />
        </View>
        <Text style={styles.faqTitle}>Where can I contact you about bugs, suggestions, etc?</Text>
        <Text style={styles.faqParagraph}>See the Credits tab!</Text>
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Divider />
        </View>
        <Text style={styles.faqTitle}>Whats that button in the top right corner?</Text>
        <Text style={styles.faqParagraph}>Thats the logout button, sorry it doesn't have a huge "THIS IS A LOGOUT BUTTON" sign.</Text>
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Divider />
        </View>
      </ScrollView>
    </View>)
  }
}

const styles = StyleSheet.create({
  faqTitle: {
    fontSize: 24,
    color: 'black',
    paddingBottom: 10,
    paddingHorizontal: 20
  },
  faqMainTitle: {
    fontSize: 48,
    color: 'black',
    textAlign: 'center',
    paddingVertical: 20
  },
  faqParagraph: {
    color: 'black',
    fontSize: 16,
    paddingBottom: 10,
    paddingHorizontal: 20
  }
});
