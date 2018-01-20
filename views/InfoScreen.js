import React, {Component} from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  StatusBar,
  View
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header, List, ListItem} from 'react-native-elements';
import {TabNavigator} from 'react-navigation';

export default class Info extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('userInfo').then((response) => {
      this.setState({user: JSON.parse(response)})
    })
  }

  static navigationOptions = {
    tabBarLabel: 'Info',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({tintColor}) => (<Icon name="info-circle" size={25} color={tintColor}/>)
  };

  render() {
    return (<View style={{backgroundColor: '#ffffff', flex: 1}}>
      <StatusBar animated={true} backgroundColor="#476dc5" showHideTransition={'fade'} barStyle="light-content" />
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
      <Animatable.View>
        <Text style={styles.welcomeTitle}>Welcome, {this.state.user.name}</Text>
        <List>
          <ListItem key={1} title={this.state.user.id} subtitle="UserID" rightIcon={<View></View>} leftIcon={{name: "info", type: 'font-awesome', style: styles.listIcon}}/>
          <ListItem key={2} title={this.state.user.googleID} subtitle="GoogleID" rightIcon={<View></View>} leftIcon={{name: "google", type: 'font-awesome', style: styles.listIcon}}/>
          <ListItem key={3} title={this.state.user.token} subtitle="Token" rightIcon={<View></View>} leftIcon={{name: "lock", type: 'font-awesome', style: styles.listIcon}}/>
          <ListItem key={4} title={this.state.user.name} subtitle="Name" rightIcon={<View></View>} leftIcon={{name: "user", type: 'font-awesome', style: styles.listIcon}}/>
          <ListItem key={5} title={this.state.user.createdAt} subtitle="Date Created" rightIcon={<View></View>} leftIcon={{name: "calendar", type: 'font-awesome', style: styles.listIcon}}/>
        </List>
      </Animatable.View>
    </View>)
  }
}

const styles = StyleSheet.create({
  welcomeTitle: {
    paddingTop: 30,
    paddingBottom: 20,
    color: 'black',
    paddingHorizontal: 20,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 32,
    fontWeight: "400"
  },
  listIcon: {
    paddingRight: 10,
    paddingLeft: 10
  }
});
