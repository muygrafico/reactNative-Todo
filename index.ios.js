/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'tomato',
    height: 120
  },
  header: {
    textAlign: 'center',
    fontWeight: '300',
    color: 'brown',
    fontSize: 30,
    top: 30,
    alignItems: 'center'
  },
  input: {
    top: 50,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    margin: 5,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1
  },
  button: {

    top: 60,
    backgroundColor: '#00BFFF',
    width: 100,
    borderRadius: 50,
    padding: 10,
    textAlign: 'center'

  }

});


export default class todoApp extends Component {

  constructor() {
    super()
    this.state = {
      todos: [],
      newTodo: ''
    }
  }

  handleInputChange(text) {
    const newTodo = text
    console.warn(text)
    this.setState({
      newTodo: newTodo
    })
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.header}>Awesome Todo App</Text>
          <TextInput
            style={styles.input}
            value={this.state.newTodo}
            onChangeText={this.handleInputChange.bind(this)}
            placeholder="Todo"
          />
          <TouchableHighlight onPress={this._onPressButton}>
            <Text style={styles.button}>Add to do</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('todoApp', () => todoApp);
