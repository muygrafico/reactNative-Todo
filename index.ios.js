import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ListView,
  View
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  header: {
    alignItems: 'center',
    color: 'brown',
    fontSize: 30,
    fontWeight: '300',
    paddingBottom: 30,
    paddingTop:30,
    textAlign: 'center',
  },
  input: {
   backgroundColor: 'tomato',
   borderColor: '#A92F30',
   borderWidth: 1,
   color: '#803033',
   height: 40,
   marginLeft: 30,
   marginRight: 30,
   paddingLeft: 15,
   paddingRight: 15,
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#503033',
    borderColor: '#A92F30',
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
  },
  buttonText: {
    alignSelf: 'center',
    color:'tomato',
    fontSize: 18,
  }

});


export default class todoApp extends Component {

  constructor() {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      todos: [],
      newTodo: '',
      dataSource: ds.cloneWithRows(['a','b'])
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


  renderTodo(todo, i) {
    return (
      <View key={todo.id} style={styles.todo}>
        <Text style={styles.todoText}>
          - {todo.text}
        </Text>

      </View>
    )
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
        <View>
          <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
          />
        </View>

      </View>
    );
  }
}

AppRegistry.registerComponent('todoApp', () => todoApp);
