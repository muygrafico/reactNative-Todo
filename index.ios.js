import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ListView,
  Image,
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

const todoStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA'
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  button: {
    position: 'absolute',
    right:15,
    height: 18,
    width: 18,
    borderColor: 'tomato',
    borderRadius: 18,
    borderWidth: 1,
  },
  buttonText: {
    color: 'tomato',
    fontSize: 12,
    textAlign: 'center'
  },
});


class Todo extends React.Component {

  fetchData() {
    fetch('http://localhost:3001/todos')
    .then((response) => response.json())
    .then((responseData) =>
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseData)
    }))
  }

  handleDeleteClick(id) {
    console.log(this.props.id)
    fetch(`http://localhost:3001/todos/${this.props.id}`, {
      method: "DELETE",
    })
      .then((todo) => {
        this.props.howToUpdate();

        // const todos = this.state.todos.filter(todo => todo.id !== id)
        // this.setState({
        //   todos: todos
        // })
      })
  }

  render() {
    return (
        <View key={this.props.id} style={todoStyles.container}>
          <Text style={todoStyles.text}>
            {this.props.text}
          </Text>
          <TouchableHighlight
            onPress={this.handleDeleteClick.bind(this)}
            style={todoStyles.button}>

            <Text style={todoStyles.buttonText}>X</Text>
          </TouchableHighlight>
        </View>
    )
  }
}



export default class todoApp extends Component {

  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
    };
  }

  fetchData() {
    fetch('http://localhost:3001/todos')
    .then((response) => response.json())
    .then((responseData) =>
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseData)
    }))
  }

  componentDidMount() {
    this.fetchData();
  }

  handleInputChange(text) {
    const newTodo = text
    this.setState({
      newTodo: newTodo
    })
  }

  handleAddTodoClick() {
  const todo = {
    text: this.state.newTodo,
    done: false,
  }

  fetch('http://localhost:3001/todos', {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((data) => data.json())
    .then((todo) => {
      this.setState({
        newTodo: ''
      })
      this.fetchData()
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
          renderRow={(data) => <Todo howToUpdate={this.fetchData.bind(this)} {...data} />}
          />
        </View>

      </View>
    );
  }
}

AppRegistry.registerComponent('todoApp', () => todoApp);
