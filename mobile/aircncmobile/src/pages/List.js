import React, { useState, useEffect } from 'react';
import { SafeAreaView, Image, ScrollView, StyleSheet, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  // Remove spce between list -> [ReactJS], [NodeJs]
  useEffect(() => {
    AsyncStorage.getItem('techs').then(storageTechs=> {
      const techsArray = storageTechs.split(',').map(techs => techs.trim());

      setTechs(techsArray);
    })

  },[]);

  return (
    <SafeAreaView style={styles.container}>
    <Image  style={styles.logo} source={logo} />

    {/* array list repetion for SpotList page */}
    <ScrollView>
    {techs.map(tech => <SpotList key={tech} tech={tech} /> )}
    </ScrollView>
    </SafeAreaView>
  )
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