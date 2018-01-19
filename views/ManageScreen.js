import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, ScrollView, Text, View} from 'react-native';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import {
  Header,
  Card,
  Button,
  List,
  ListItem,
  Icon,
  FormLabel,
  FormInput
} from 'react-native-elements';
import {TabNavigator} from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import {SegmentedControls} from 'react-native-radio-buttons'
import Spinner from 'react-native-loading-spinner-overlay';
import ActualSpinner from 'react-native-spinkit';

function setSelectedOption(selectedOption) {
  this.setState({selectedOption});
}

export default class Manage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      crns: [],
      selectedOption: 'closed',
      busy: false,
      loggedIn: true
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('userInfo').then((response) => {
      this.setState({user: JSON.parse(response)})
      this.fetchCRNs()
    })
  }

  fetchCRNs() {
    fetch('https://crnotify.cf/mobile_api/getCRNs?token=' + this.state.user.token, {method: 'POST'}).then((response) => {
      const responseJSON = JSON.parse(response._bodyText)
      if (responseJSON.success) {
        this.setState({crns: responseJSON.data})
      } else {
        this.displayError(responseJSON.error)
      }
    })
  }

  addCRN() {
    this.setState({busy: true})
    fetch('https://crnotify.cf/mobile_api/addCRN?token=' + this.state.user.token + '&state=' + this.state.selectedOption + '&crn=' + this.state.crnVal, {method: 'POST'}).then((response) => {
      const responseJSON = JSON.parse(response._bodyText)
      if (responseJSON.success) {
        this.fetchCRNs()
        this.displaySuccess('Successfully added CRN!')
        this.setState({busy: false})
      } else {
        this.displayError(responseJSON.error)
        this.setState({busy: false})
      }
    })
  }

  logOut() {
    AsyncStorage.setItem('userInfo', '{}').then(()=>{
      this.setState({
        loggedIn: false
      })
    })
  }

  displayError(err) {
    this.dropdown.alertWithType('error', 'Error!', err);
  }

  displaySuccess(msg) {
    this.dropdown.alertWithType('success', 'Success!', msg);
  }

  removeCRN(crn) {
    fetch('https://crnotify.cf/mobile_api/removeCRN?token=' + this.state.user.token + '&crn=' + crn, {method: 'POST'}).then((response) => {
      const responseJSON = JSON.parse(response._bodyText)
      if (responseJSON.success) {
        this.fetchCRNs()
        this.displaySuccess('Successfully removed CRN!')
      } else {
        this.displayError(responseJSON.error)
      }
    }).catch((e) => {
      this.displayError('Something happened.')
    })
  }

  static navigationOptions = {
    tabBarLabel: 'Manage',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({tintColor}) => (<FAIcon name="cog" size={25} color={tintColor}/>)
  };

  render() {
    const options = ["Open", "Closed"]
    return (<View style={{
        flex: 1,
        backgroundColor: '#ffffff'
      }}>
      <Spinner visible={this.state.busy}>
        <View style={{backgroundColor: 'rgba(0, 0, 0, 0.4)', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActualSpinner type="Wave" size={70} color="#ffffff" visible={true}/>
        </View>
      </Spinner>
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
      <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
        <Text style={styles.welcomeTitle}>Manage CRNs</Text>
        <FormLabel>CRN</FormLabel>
        <FormInput keyboard="numeric" returnKeyType="done" disabled={this.state.busy} placeholder="Enter CRN here" onChangeText={(val) => this.setState({crnVal: val})} value={this.state.crnVal}/>
        <View style={{
            paddingHorizontal: 20,
            paddingTop: 20
          }}>
          <View style={{paddingBottom: 20}}>
            <SegmentedControls disabled={this.state.busy} options={options} onSelection={setSelectedOption.bind(this)} selectedOption={this.state.selectedOption}/>
          </View>
          <Button small={true} rounded={true} disabled={this.state.busy} backgroundColor="#0053b3" leftIcon={{
              name: 'plus',
              type: 'font-awesome'
            }} style={{
              paddingTop: 10
            }} onPress={() => this.addCRN()} title="Add CRN"></Button>
        </View>
        <List>
          {
            this.state.crns.map((elem, i) => {
              return (<ListItem key={i} title={elem.crn + ' [' + elem.className + ']'} rightIcon={<Icon raised = {
                  true
                }
                name = "trash" type = "font-awesome" color = "#eb2b2b" onPress = {
                  () => {
                    this.removeCRN(elem.crn)
                  }
                } />} subtitle={elem.name + ', Section ' + elem.section} badge={{
                  value: elem.state.toUpperCase(),
                  containerStyle: {
                    backgroundColor: (elem.state == 'closed')
                      ? '#b41000'
                      : '#0ba703'
                  }
                }}/>)
            })
          }
        </List>
      </ScrollView>
      <DropdownAlert messageNumOfLines={6} ref={ref => this.dropdown = ref}/>
    </View>)
  }
}

const styles = StyleSheet.create({
  welcomeTitle: {
    paddingTop: 30,
    color: 'black',
    paddingBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 36
  },
  formTitle: {
    paddingTop: 30,
    color: 'black',
    paddingLeft: 20,
    paddingBottom: 20,
    fontSize: 24
  },
  cardContent: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 20
  }
});
