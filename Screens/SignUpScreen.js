import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Header } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';

export default class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      confirmPassword: '',
    };
  }

  userSignUp = (emailId, password, confirmPassword) => {
    console.log('firebase connected');
    if (password !== confirmPassword) {
      return alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection('users').add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            email_id: this.state.emailId,
            address: this.state.address,
          });
          return alert('User Added Successfully');
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage);
        });
    }
  };

  render() {
    return (
      <View>
        <SafeAreaView style={styles.droidSafeArea} />
        <Header
          backgroundColor="orange"
          centerComponent={{
            text: 'Registration',
            style: {
              color: 'black',
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'britannic',
              paddingTop:5,
              paddingBottom:5,
            },
          }}
        />
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <TextInput
                style={styles.formTextInput1}
                placeholder={'First Name'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Last Name'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Contact'}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Address'}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    address: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Email'}
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Confirm Password'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
              />
            </KeyboardAvoidingView>
            <View>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() =>
                  this.userSignUp(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  )
                }>
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Text style={styles.registerButtonText}>Cancel</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#5e7f19',
    alignItems: 'center',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  formTextInput: {
    width: 300,
    height: 40,
    fontFamily: 'Comic Sans MS',
    border: 'dashed',
    paddingLeft: 10,
    marginLeft: 20,
    marginTop: 10,
    color: 'black',
    fontSize: 15,
    backgroundColor: '#c5eee3',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: 'orange',
    width: '50%',
    height: 40,
    border: 'dashed',
    paddingLeft: 5,
    marginLeft: 80,
    marginBottom: 20,
    marginTop: 30,
  },
  registerButtonText: {
    fontFamily: 'britannic',
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 10,
  },
  formTextInput1: {
    width: 300,
    height: 40,
    fontFamily: 'Comic Sans MS',
    border: 'dashed',
    paddingLeft: 10,
    marginLeft: 20,
    marginTop: 30,
    color: 'black',
    fontSize: 15,
    backgroundColor: '#c5eee3',
    fontWeight: 'bold',
    marginBottom: 10,
  },
    submitButton: {
         backgroundColor: 'orange',
    width: '50%',
    height: 40,
    border: 'dashed',
    paddingLeft: 5,
    marginLeft: 80,
    marginBottom: 50,
        justifyContent :'center'
  },
});
