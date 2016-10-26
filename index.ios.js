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

const rowStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

const Todo = (props) => (
  <View key={props.id} style={rowStyles.container}>
    <Text style={rowStyles.text}>
      {`- ${props.text}`}
    </Text>
  </View>
);




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

  handleAddTodoClick(id){
    console.log(id)
    const todos = this.state.dataSource._dataBlob.s1
    console.log(todos)
    // const todo = todos.find((todo) => todo.id === id)
    // todo.done = !todo.done
    // alert(todo)
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
          renderRow={(data) => <Todo {...data} />}
          />
        </View>

      </View>
    );
  }
}

AppRegistry.registerComponent('todoApp', () => todoApp);
