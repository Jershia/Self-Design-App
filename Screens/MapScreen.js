import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import * as SMS from 'expo-sms';

const LOCATION_TASK_NAME = 'background-location-task';
import firebase from 'firebase';
import db from '../config';
const threshold = 100;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      error: '',
      userPhoneNo:''
    };
  }

  componentDidMount(){
    this.fetchUser();
    this.calculateDistance();
  }

  fetchUser = () => {
    let userInfo;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        userInfo = snapshot.val()
        this.setState({userPhoneNo:userInfo.contact})
      });
  };

  _getLocationAsync = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      enableHighAccuracy: true,
      distanceInterval: 1,
      timeInterval: 5000,
    });
    // watchPositionAsync Return Lat & Long on Position Change
    this.location = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000,
      },
      (newLocation) => {
        let { coords } = newLocation;
        // console.log(coords);
        let region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045,
        };
        this.setState({ region: region });
      },
      (error) => console.log(error)
    );
    return this.location;
  };

  calculateDistance() {
    if (this.state.region.latitude && this.state.region.longitude) {
      let lat_result = this.state.region.latitude + threshold;
      let long_result = this.state.region.longitude + threshold;
      let display =
        (lat_result > threshold || long_result) > threshold ? true : false;
    }
  }

  async componentWillMount() {
    // Asking for device location permission
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      this._getLocationAsync();
    } else {
      this.setState({ error: 'Locations services needed' });
    }
    userId = (await AsyncStorage.getItem('userId')) || 'none';
    userName = (await AsyncStorage.getItem('userName')) || 'none';
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.region}
          showsCompass={true}
          showsUserLocation={true}
          rotateEnabled={true}
          ref={(map) => {
            this.map = map;
          }}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;
    // Alert.alert(JSON.stringify(long))
    userId = (await AsyncStorage.getItem('userId')) || 'none';

    // Storing Received Lat & Long to DB by logged In User Id
    axios({
      method: 'POST',
      url: 'http://000.000.0.000/phpServer/ajax.php',
      data: {
        action: 'saveLocation',
        userId: userId,
        lat,
        long,
      },
    });
    //  console.log("Received new locations for user = ", userId, locations);
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
