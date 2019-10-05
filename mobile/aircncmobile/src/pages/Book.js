import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import api from '../services/api';

export default function Book({ navigation }) {
  const [date, setDate] = useState('');
  const id = navigation.getParam('id');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');
    await api.post(
      `/spots/${id}/bookings`,
      {
        date,
      },
      {
        headers: { user_id },
      }
    );

    Alert.alert('Your request has been sent.');

    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>CHOOSE BOOKING DATE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Select your best date"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />
      {/* button */}
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Reservation request</Text>
      </TouchableOpacity>
      {/* cancelation */}
      <TouchableOpacity
        onPress={handleCancel}
        style={[styles.button, styles.cancelButton]}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

//css
const styles = StyleSheet.create({
  container: {
    margin: 30,
    marginTop: 50,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
