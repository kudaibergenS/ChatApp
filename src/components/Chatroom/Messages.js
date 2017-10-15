import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity
} from "react-native";

var base64 = require("base-64");

export default class Message extends Component {
    constructor(props){
        super(props);

        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            messagesDataSource: ds
        };
    }

    componentDidMount(){
        setInterval(() => {
            this.fetchMessages()
        }, 2500);
        
    }

    renderRow(message){
        var profile_img_uri = message.user_id === this.props.user.id ? this.props.user.profile_img : this.props.contact.profile_img;

        return (
            <View style={styles.row}>
                <Image 
                    style={styles.userImage} 
                    source={{ 
                             uri: "http://192.168.1.77:8080/user/image/" + profile_img_uri
                           }} />      
                <Text style={styles.rowText}>{message.message_text}</Text>  
                <Text>{this.formatTime(message.sent_date)}</Text>
            </View>
        );
    }

    fetchMessages(){
        const url = "http://192.168.1.77:8080/messages/get/" + this.props.contact.id;

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(this.props.user.login + ':' + this.props.user.password)
            }
        })
        .then((response) => { 
            if(response.status === 200){
                response.json()
                .then((messages) => {

                    this.setState({
                      messagesDataSource: this.state.messagesDataSource.cloneWithRows(messages)
                    }); 
                })
            }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    onPress(user){
        this.props.navigator.push({ 
            id: "contacts",
            user: user 
        });
    }
    
    render(){

        return (
            <View style={styles.container}>
                
                <View style={styles.appBar}>
                    
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => this.onPress(this.props.user)}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity >
                    
                    <View style={styles.contactInfo}>
                        <Text>{this.props.contact.firstname} {this.props.contact.lastname}</Text>
                        <Text>{this.formatDate(this.props.contact.last_enter)}</Text>
                    </View>                    
                        
                    <Image 
                        style={styles.contactImage} 
                        source={{
                                  uri: "http://192.168.1.77:8080/user/image/" + this.props.contact.profile_img
                                }} />                    
                </View>

                <ListView 
                dataSource={this.state.messagesDataSource}
                renderRow={this.renderRow.bind(this)}
                />          
        
            </View>
        );
    }

formatDate(timestamp) {
  const currentDate = new Date(),
        last_seen = new Date(timestamp);
        monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];

  var diff = currentDate - last_seen;
  var diffDays = Math.floor(diff / 86400000), // days
      diffHrs = Math.floor((diff % 86400000) / 3600000), // hours
      diffMins = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
  console.log(diffDays + ' ' + diffHrs + ' ' + diffMins);

  if(diffDays === 1){
    return 'yesterday';
  }
  else if (diffDays === 2) {
    return '2 days ago';
  }
  else if (diffDays > 2) {
    return 'on ' + last_seen.getDate() + ' of ' + monthNames[last_seen.getMonth()];
  }
  else {
    if(diffHrs >= 1 && diffHrs < 3){
      return 'an hour ago';
    }
    else if(diffHrs >= 3 && diffHrs < 6){
      return '3 hours ago';
    }
    else if(diffHrs >= 6 && diffHrs < 9){
      return '7 hours ago';
    }
    else if(diffHrs >= 9 && diffHrs < 10){
      return '10 hours ago';
    }
    else if(diffHrs > 10 && diffHrs < 25){
      return 'at ' + last_seen.getHours() + ':' + last_seen.getMinutes();
    }
    else {
      if(diffMins > 5 && diffMins < 15){
        return '5 minutes ago';
      }
      else if(diffMins > 15 && diffMins < 30){
        return '15 minutes ago';
      }
      else if(diffMins > 30 && diffMins <= 60){
        return '30 minutes ago';
      }
      else {
        return 'just now';
      }
    }
  }
}

formatTime(timestamp){
    const currentDate = new Date(),
          sent_time = new Date(timestamp),
          monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];

    var diff = currentDate - sent_time;
    var diffDays = Math.floor(diff / 86400000);

    var hours = sent_time.getHours(),
        minutes = sent_time.getMinutes();

    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;
    if(diffDays === 1){
        return 'yesterday at ' + hours + ':' + minutes;
    }
    else if (diffDays === 2) {
        return '2 days ago at '+ hours + ':' + minutes;
    }
    else if (diffDays > 2) {
        return "on " + sent_time.getDate() + " of " + monthNames[sent_time.getMonth()];
    }
    else{
        return hours + ":" + minutes;
    } 

}

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 3,
    borderBottomColor: "#ACACAC",
    borderBottomWidth: 1,
  },
  listView: {
  },
  rowText: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10
  },  
  appBar: {
    backgroundColor: "#E1E1E1",
    height: 40
  },
  contactImage: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 0,
    right: 5,
    borderRadius: 50
  },
  contactInfo: {     
    alignItems: 'center',
    justifyContent: 'center' 
  },
  backButton: { 
    position: 'absolute',
    top: 10,
    left: 10
  },
  backButtonText: {
    color: '#3498db',  
    fontSize: 16,
  },
  userImage: {      
    width: 40,
    height: 40,
    borderRadius: 50
  }
});