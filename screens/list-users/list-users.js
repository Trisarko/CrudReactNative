import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import CardComponent from './card-component';
import {useIsFocused} from '@react-navigation/native';


function ListUsers({ navigation }) {
  const isFocused = useIsFocused();
  const [users, setUsers] = useState([]);
  const listUsers = async () => {
    let response = await fetch('https://us-central1-user-management-app-c1af1.cloudfunctions.net/api/listusers');
    let json = await response.json();
    setUsers(json.users);
  }
  const detailUser = (item) => {
      navigation.navigate('Detail', {user: item});
  }
  useEffect(() => {
    //console.log("isFocused: " + isFocused);
    listUsers();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scheduled Appointments</Text>
      <View>
        <Image style={styles.image} source={require('../images/Appointments.jpg')}></Image>
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => <TouchableHighlight onPress = {() => detailUser(item)} style={styles.listButton}>
          <CardComponent user={item} />
        </TouchableHighlight >}
        keyExtractor={item => item.id}
      ></FlatList>
      <View>
      <TouchableHighlight style={styles.createButton} onPress={() => navigation.navigate('Create')}>
        <Text style={styles.textCreateButton}>Make an Appointment</Text>
      </TouchableHighlight>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2ebf2',
    flexDirection: "column",
    alignItems: "center"
  },
  createButton: {
    marginHorizontal: 65,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#00716F",
    paddingVertical: 10,
    borderRadius: 23,
    paddingHorizontal: 30,
    marginBottom: 20
  },
  textCreateButton: {
    color: "white",
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 16
  },
  listButton: {
    backgroundColor: "white",
    marginTop: 10,
    padding: 13,
    borderColor: "#00716F",
    borderWidth: 1,
    borderRadius: 5,
    width: Dimensions.get('screen').width * 0.8
  },
  text: {
    color: "#00716F",
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 24,
    paddingTop: 10
  },
  image: {
    width: 320,
    height: 130,
    marginTop: 10
  }
});
export default ListUsers
