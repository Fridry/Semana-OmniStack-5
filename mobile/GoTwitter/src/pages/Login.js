import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

export default class pages extends Component {
  state = {
    username: '',
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@OmniStack:username');

    if (username) {
      this.props.navigation.navigate('App');
    }
  }

  handleInputChange = username => {
    this.setState({username});
  };

  handlelogin = async () => {
    const {username} = this.state;
    if (!username.length) {
      return;
    }
    await AsyncStorage.setItem('@OmniStack:username', username);

    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.content}>
          <View>
            <Icon name="twitter" size={64} color="#4BB0EE" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            value={this.state.username}
            onChangeText={this.handleInputChange}
            onSubmitEditing={this.handlelogin}
            returnKeyType="send"
          />

          <TouchableOpacity onPress={this.handlelogin} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
    marginTop: 30,
  },

  button: {
    height: 44,
    alignSelf: 'stretch',
    marginTop: 10,
    backgroundColor: '#4BB0EE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
