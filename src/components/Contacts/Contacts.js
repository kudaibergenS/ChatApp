/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View,ListView } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

export default class Contacts extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      text: '',
      userDataSource: ds
    }
  }

  componentDidMount(){
    /*
    fetch("http://192.168.1.77:8080/user/testPost", {
      method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    });*/

    this.fetchUsers();
  }

  fetchUsers(){
    fetch('http://192.168.1.77:8080/user/test')
        .then((response) => response.json())
        .then((response) => {

          this.setState({
            userDataSource: this.state.userDataSource.cloneWithRows(response)
          });          
        })
        .catch((error) => {
          
        })
  }

  renderRow(user, sectionId, rowId, highlightRow){
    
    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>{user.id}) {user.login}</Text>
      </View>
    );      
  }

  render() {
    return (
      <View style={styles.container}>
        
        <ListView 
          dataSource={this.state.userDataSource}
          renderRow={this.renderRow.bind(this)}
        />

        <ActionButton buttonColor="rgba(231,76,60,1)">
          
          <ActionButton.Item 
            buttonColor="#3498db" 
            title="Write message" 
            onPress={() => this.setState({ text: ', SOOQA!' })}>

            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>         
          
        </ActionButton>


      </View>
      
    );
  }
}

const users = [
  {
    name: "Sanzhar"
  },
  {
    name: "Assel"
  },
  {
    name: 'Zhandos'
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 3,
    backgroundColor: '#f4f4f4'
  },
  rowText: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

