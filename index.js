import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Linking,
  AsyncStorage,
  Text,
  View
} from 'react-native';

import SafariView from 'react-native-safari-view';
import LinearGradient from 'react-native-linear-gradient';
import RequiresConnection from 'react-native-offline-mode';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Header} from 'react-native-elements';
import {TabNavigator} from 'react-navigation';
import Spinner from 'react-native-spinkit';
import DropdownAlert from 'react-native-dropdownalert';

import {Router} from './views/router'
import InfoScreen from './views/InfoScreen';
// import ManageScreen from './views/ManageScreen';
// import SettingsScreen from './views/SettingsScreen';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: 'null',
      isLoggedIn: false,
      doneCheckingStatus: false,
      enabled: false,
      googleToken: 'null'
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('userInfo').then((response) => {
      if (response) {
        const data = JSON.parse(response)
        this.setState({user: data, isLoggedIn: true, googleToken: data.token})
      }
    })
  }

  // Set up Linking
  componentDidMount() {
    fetch('http://localhost:8080/status').then((response) => response.json()).then((responseJSON) => {
      this.setState({doneCheckingStatus: true, enabled: responseJSON.enabled})
    })
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({url});
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  logOut() {
    AsyncStorage.setItem('userInfo', '').then(()=>{
      this.setState({
        isLoggedIn: false
      })
      this.displaySuccess('Successfully logged out!')
    })
  }

  displayError(err) {
    this.dropdown.alertWithType('error', 'Error!', err);
  }

  displaySuccess(msg) {
    this.dropdown.alertWithType('success', 'Success!', msg);
  }

  handleOpenURL = ({url}) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    const userData = JSON.parse(decodeURI(user_string))
    //Store user details
    AsyncStorage.setItem('userInfo', JSON.stringify(userData), () => {
      this.setState({user: userData, isLoggedIn: true});
    });

    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({url: url, fromBottom: true})
      //or openURL for Android
    } else {
      Linking.openURL(url);
    }
  };

  doLogin = () => this.openURL('http://localhost:8080/auth/mobile');

  render() {
    if (this.state.doneCheckingStatus) {
      if (this.state.enabled) {
        if (this.state.isLoggedIn) {
          return <Router screenProps={{logOut: this.logOut.bind(this)}}/>
        } else {
          return (<LinearGradient style={styles.container} colors={['#00C9FF', '#92FE9D']}>
            <View style={styles.mainContainer}>
              <Animatable.Text animation="fadeInUp" duration={1500} style={styles.mainTitle}>CRNotify</Animatable.Text>
              <Animatable.Text animation="zoomIn" duration={1000} delay={500} style={styles.mainParagraph}>This is an app built for AUS students to recieve notifications on any changes in the availability of their chosen CRNs.</Animatable.Text>
              <Animatable.Text animation="zoomIn" duration={1000} delay={500} style={styles.mainParagraph}>Use this to make sure you know when that class you really want opens up, and when a class you are in closes.</Animatable.Text>
              <Animatable.View style={styles.loginButton} animation="fadeIn" duration={1000} delay={1500}>
                <Button large={true} raised={true} fontWeight="500" onPress={this.doLogin} backgroundColor="#d62d20" icon={{
                    name: 'google',
                    type: 'font-awesome'
                  }} title='| Login with Google'/>
              </Animatable.View>
            </View>
            <DropdownAlert messageNumOfLines={6} ref={ref => this.dropdown = ref}/>
          </LinearGradient>);
        }
      } else {
        return(
          <LinearGradient style={styles.container} colors={['#e93232', '#ff8e46']}>
            <View style={styles.mainContainer}>
              <Animatable.Text animation="fadeInUp" duration={2000} style={styles.mainTitle}>CRNotify</Animatable.Text>
              <Animatable.View animation="fadeInUp" duration={2000} style={styles.errorView}>
                <Icon name="exclamation-triangle" size={100} color="#ffffff"/>
              </Animatable.View>
              <Animatable.Text animation="zoomIn" duration={1000} delay={1200} style={styles.errorParagraph}>Sorry! CRNotify has been disabled for now due to the registration being closed, but it will be back up when registration opens up.</Animatable.Text>
            </View>
          </LinearGradient>
        )
      }
    } else {
      return (<LinearGradient style={styles.container} colors={['#00C9FF', '#92FE9D']}>
        <View style={styles.mainContainer}>
          <Animatable.Text animation="fadeInUp" duration={500} style={styles.mainTitle}>CRNotify</Animatable.Text>
          <Animatable.View animation="fadeInUp" duration={500} style={styles.disabledStatus}>
            <Spinner type="Wave" size={70} color="#ffffff" visible={true}/>
          </Animatable.View>
          <Animatable.Text animation="zoomIn" duration={500} delay={500} style={styles.mainParagraph}>Checking the status of the CRNotify website...</Animatable.Text>
        </View>
      </LinearGradient>)
    }
  }

}

const OfflineMessage = () => {
  return (<LinearGradient style={styles.container} colors={['#e93232', '#ff8e46']}>
    <View style={styles.mainContainer}>
      <Animatable.Text animation="fadeInUp" duration={2000} style={styles.mainTitle}>CRNotify</Animatable.Text>
      <Animatable.View animation="fadeInUp" duration={2000} style={styles.errorView}>
        <Icon name="exclamation-triangle" size={100} color="#ffffff"/>
      </Animatable.View>
      <Animatable.Text animation="zoomIn" duration={1000} delay={1200} style={styles.errorParagraph}>Sorry! This app needs internet to work. Come back when you have internet access.</Animatable.Text>
    </View>
  </LinearGradient>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  mainContainer: {
    top: 200,
    alignItems: 'center'
  },
  mainTitle: {
    fontSize: 72,
    color: '#ffffff',
    fontWeight: '900'
  },
  loginButton: {
    paddingTop: 30
  },
  mainParagraph: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '400'
  },
  errorParagraph: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '600'
  },
  errorView: {
    paddingTop: 20
  },
  disabledStatus: {
    paddingTop: 20
  }
});

AppRegistry.registerComponent('CRNotify', () => RequiresConnection(App, OfflineMessage));
