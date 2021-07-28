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
} from 'react-native';
import { Header } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
    };
  }

  login = async (email, password) => {
    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          this.props.navigation.navigate('Map');
        }
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert("user dosen't exists");
            console.log("doesn't exist");
            break;
          case 'auth/invalid-email':
            alert('incorrect email or password');
            console.log('invaild');
            break;
        }
      }
    } else {
      alert('enter email and password');
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <SafeAreaView style={styles.droidSafeArea} />
        <Header
          backgroundColor="orange"
          centerComponent={{
            text: 'Kids Safety',
            style: {
              color: 'black',
              fontSize: 25,
              fontWeight: 'bold',
              fontFamily: 'britannic',
            },
          }}
        />
        <View style={styles.container}>
          <View>
            <TextInput
              style={styles.loginBox}
              placeholder="abc@example.com"
              keyboardType="email-address"
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />

            <TextInput
              style={styles.loginBox1}
              secureTextEntry={true}
              placeholder="Enter Password"
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                this.login(this.state.emailId, this.state.password);
              }}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                this.props.navigation.navigate('SignUp');
              }}>
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5e7f19',
    display: 'flex',
    justifyContent: 'center',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  loginBox: {
    width: 300,
    height: 40,
    fontFamily: 'Comic Sans MS',
    border: 'dashed',
    paddingLeft: 10,
    marginLeft: 40,
    marginTop: 10,
    color: 'black',
    fontSize: 15,
    backgroundColor: '#c5eee3',
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1.5,
    justifyContent: 'center',
  },
  imageIcon: {
    width: 230,
    height: 150,
    marginTop: 30,
    marginLeft: 60,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: 'orange',
    width: '50%',
    height: 40,
    border: 'dashed',
    paddingLeft: 5,
    marginLeft: 80,
    marginBottom: 50,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'britannic',
    textAlign: 'center',
    fontSize: 25,
    justifyContent: 'center',
  },
  loginBox1: {
    width: 300,
    height: 40,
    fontFamily: 'Comic Sans MS',
    border: 'dashed',
    paddingLeft: 10,
    marginLeft: 40,
    marginTop: 10,
    color: 'black',
    fontSize: 15,
    backgroundColor: '#c5eee3',
    fontWeight: 'bold',
    marginBottom: 40,
    borderBottomWidth: 1.5,
    justifyContent: 'center',
  },
});
