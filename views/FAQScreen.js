import React, {Component} from 'react';
import {
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Text,
  View
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header, List, ListItem} from 'react-native-elements';
import {TabNavigator} from 'react-navigation';

export default class Info extends Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    tabBarLabel: 'FAQ',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({tintColor}) => (<Icon name="question" size={30} color={tintColor}/>)
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
        <Text style={styles.faqTitle}>What is this?</Text>
        <Text style={styles.faqParagraph}>An app, dumbass.</Text>
      </ScrollView>
    </View>)
  }
}

const styles = StyleSheet.create({
  faqTitle: {
    fontSize: 36,
    paddingBottom: 30
  },
  faqMainTitle: {
    fontSize: 48,
    textAlign: 'center',
    paddingVertical: 20
  },
  faqParagraph: {
    fontWeight: '200',
    fontSize: 22,
    paddingBottom: 10
  }
});
