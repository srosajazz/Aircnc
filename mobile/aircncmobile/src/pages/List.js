import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import {
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  Alert,
} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  // Booking.approved ? 'APPROVED' : 'DECLINED'
  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://localhost:3333', {
        query: { user_id },
      });

      socket.on('booking_response', booking => {
        Alert.alert(`Your reservation on ${booking.spot.company} 
          on ${booking.date} was ${
          booking.approved ? 'APPROVED' : 'DECLINED'
        }`);
      });
    });
  }, []);

  // Remove spce between list -> [ReactJS], [NodeJs]
  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(techs => techs.trim());

      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      {/* array list repetion for SpotList page */}
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

//styles css

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
});
