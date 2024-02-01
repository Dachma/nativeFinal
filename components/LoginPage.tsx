import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';

function LoginPage({navigation}) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const response = await axios.post(
        'https://veli.store/api/user/user_auth/login/',
        {
          email: mail,
          password: password,
        },
      );
      if (response?.data?.access) {
        navigation.navigate('ლეპტოპები');
      }
    } catch (err) {
      if (err.response.data) {
        Alert.alert('მეილი ან პაროლი არასწორია');
      }
    }
  }

  return (
    <SafeAreaView style={styles.loginPageContainer}>
      <View style={styles.veliTextContainer}>
        <Text style={styles.veliText}>VELI</Text>
      </View>
      <View>
        <Text style={styles.shoppingText}>შოპინგი იწყება აქ</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          placeholder="მეილი"
          onChangeText={setMail}
          value={mail}
        />
        <TextInput
          style={styles.input}
          placeholder="პაროლი"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.logIn}>შესვლა</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginPageContainer: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    height: 50,
    alignItems: 'center',
  },
  veliTextContainer: {
    width: '25%',
    paddingBottom: 20,
    paddingTop: 20,
  },
  veliText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: '#B4D984',
    borderRadius: 25,
  },
  shoppingText: {
    color: 'black',
    fontWeight: 'bold',
  },
  inputsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 60,
    gap: 20,
    width: '80%',
  },
  input: {
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
  },
  logIn: {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    height: 48,
    paddingTop: 12,
    borderRadius: 8,
  },
});

export default LoginPage;
