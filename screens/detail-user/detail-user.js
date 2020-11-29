import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Alert } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';


function DetailUser({ route, navigation }) {
    const { name, lastname, identification, birthdate, city, neighborhood, phone, id } = route.params.user;
    const confirmation = () => {
        Alert.alert('Delete Appointment', 'Are You Sure?',[
        {text: 'Yes', onPress: () => deleteUser()},
        {text: 'No', onPress: () =>console.log(false)}
        ])
    }
    const deleteUser = async () =>{
        
        try{
            const response = await fetch('https://us-central1-user-management-app-c1af1.cloudfunctions.net/api/userdelete', {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id : id
              })
            });
            const json = await response.json();
            Alert.alert("Appointment Deleted Successfully");
            navigation.goBack();
          }catch(error){
            Alert.alert(error);
          }
    }
    const updateUser = () => {
        navigation.navigate('Update', {user: route.params.user});
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Appointment Detail</Text>
            <View>
                <Image style={styles.image} source={require('../images/details.jpg')}></Image>
            </View>
            <View style={styles.detailCard}>
                <Text style={styles.text}> Name: <Text style={styles.text2}>{name} {lastname}</Text></Text>
                <Text style={styles.text}> Identintification: <Text style={styles.text2}>{identification}</Text> </Text>
                <Text style={styles.text}> Birthdate: <Text style={styles.text2}>{birthdate}</Text> </Text>
                <Text style={styles.text}> City: <Text style={styles.text2}>{city}</Text></Text>
                <Text style={styles.text}> Neighborhood: <Text style={styles.text2}>{neighborhood}</Text></Text>
                <Text style={styles.text}> Phone: <Text style={styles.text2}>{phone}</Text></Text>
                <View style={styles.buttonView}>
                    <TouchableHighlight onPress = {updateUser} style={styles.editButton}>
                        <Text style={styles.textButton}>Edit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress = {confirmation} style={styles.deleteButton}>
                        <Text style={styles.textButton}>Delete</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b2ebf2',
        flexDirection: "column",
        padding: 10,
        alignItems: "center"
    },
    detailCard: {
        borderColor: '#00716F',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: "white",
        marginTop: 30,
        padding: 8
    },
    textCreateButton: {
        color: "white"
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    editButton: {
        marginHorizontal: 35,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#00716F",
        paddingVertical: 10,
        borderRadius: 23,
        paddingHorizontal: 30,
        width: Dimensions.get('screen').width * 0.3,
        marginBottom: 20
    },
    deleteButton: {
        marginHorizontal: 35,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#00716F",
        paddingVertical: 10,
        borderRadius: 23,
        paddingHorizontal: 30,
        width: Dimensions.get('screen').width * 0.3,
        marginBottom: 20
    },
    textButton: {
        color: "white",
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: 16
    },
    text: {
        fontWeight: "bold",
        fontSize: 17
    },
    text2: {
        fontWeight: "normal",
        fontSize: 15
    },
    textTitle: {
      color: "#00716F",
      fontFamily: "monospace",
      fontWeight: "bold",
      fontSize: 24,
      paddingTop: 10,
    },
    image: {
      width: 320,
      height: 200,
      marginTop: 10,
      borderRadius: 5,
    }
});

export default DetailUser