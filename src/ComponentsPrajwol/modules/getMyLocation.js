import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

export async function getmyLocation() {
  try {
    
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Give location permission',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude: latitude, longitude:longitude });
          },
          (error) => {
            reject(error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      });
    } else {
      throw new Error('Location permission denied');
    }
  } catch (error) {
    throw new Error(`Error getting location permission: ${error.message}`);
  }
}

