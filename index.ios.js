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
    backgroundColor: 'tomato',
  },
  header: {
    textAlign: 'center',
    fontWeight: '300',
    color: 'brown',
    fontSize: 30,
    paddingTop:30,
    paddingBottom: 30,
    alignItems: 'center'
  },
  input: {
   height: 40,
   borderColor: '#A92F30',
   backgroundColor: 'tomato',
   color: '#803033',
   borderWidth: 1,
   marginLeft: 30,
   marginRight: 30,
   paddingLeft: 15,
   paddingRight: 15
  },
  button: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#503033',
    borderColor: '#A92F30',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color:'tomato',
    alignSelf: 'center'
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
    this.setState({
      newTodo: newTodo
    })
  }

  handleAddTodoClick(text){
    console.log(text)
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

            <TouchableHighlight
              style={styles.button}
              onPress={this.handleAddTodoClick.bind(this)}
            >
              <Text style={styles.buttonText}>Add todo</Text>
            </TouchableHighlight>

        </View>

      </View>
    );
  }
}

AppRegistry.registerComponent('todoApp', () => todoApp);
