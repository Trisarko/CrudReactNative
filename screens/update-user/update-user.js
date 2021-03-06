import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { TouchableHighlight } from 'react-native-gesture-handler';

function UpdateUser({ route, navigation }) {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [identification, setIdentification] = useState();
    const [birthdate, setBirthdate] = useState("");
    const [city, setCity] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [phone, setPhone] = useState();
    const updateUser = async () => {
        if (!name.trim()) {
            alert('Please Enter Name');
            return;
        }
        if (!lastname.trim()) {
            alert('Please Enter Lastname');
            return;
        }
        if (!identification.trim()) {
            alert('Please Enter Identification');
            return;
        }
        if (!birthdate.trim()) {
            alert('Please Enter Birthdate');
            return;
        }
        if (!city.trim()) {
            alert('Please Enter City');
            return;
        }
        if (!neighborhood.trim()) {
            alert('Please Enter Neighborhood');
            return;
        }
        if (!phone.trim()) {
            alert('Please Enter Phone');
            return;
        }
        if (isNaN(identification)) {
            alert('The Identification is not a Number');
            return;
        }
        if (isNaN(phone)) {
            alert('The Phone is not a Number');
            return;
        }
        if (!(phone.length == 10)) {
            alert("Please Enter a Valid Phone Number (10 Numbers).")
            return false
        }

        try {
            const response = await fetch('https://us-central1-user-management-app-c1af1.cloudfunctions.net/api/updateuser', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: route.params.user.id,
                    name: name,
                    lastname: lastname,
                    identification: identification,
                    birthdate: birthdate,
                    city: city,
                    neighborhood: neighborhood,
                    phone: phone
                })
            });
            const json = await response.json();
            Alert.alert("Appointment Updated Successfully");
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert(error);
        }

    }
    useEffect(() => {
        //console.log("isFocused: " + isFocused);
        setName(route.params.user.name);
        setLastname(route.params.user.lastname);
        setIdentification(route.params.user.identification);
        setBirthdate(route.params.user.birthdate);
        setCity(route.params.user.city),
            setNeighborhood(route.params.user.neighborhood);
        setPhone(route.params.user.phone);
    }, []);
    return (

        <View style={styles.container}>
            <Text style={styles.text}>Medical Appointments</Text>
            <View>
                <Image style={styles.image} source={require('../images/doctors.jpg')}></Image>
            </View>
            <TextInput style={styles.textInput} value={name} onChangeText={text => setName(text)} placeholder="Name"></TextInput>
            <TextInput style={styles.textInput} value={lastname} onChangeText={text => setLastname(text)} placeholder="Lastname"></TextInput>
            <TextInput style={styles.textInput} value={identification} onChangeText={text => setIdentification(text)} placeholder="Identification"></TextInput>
            <TextInput style={styles.textInput} value={birthdate} onChangeText={text => setBirthdate(text)} placeholder="Birthdate"></TextInput>
            <TextInput style={styles.textInput} value={city} onChangeText={text => setCity(text)} placeholder="City"></TextInput>
            <TextInput style={styles.textInput} value={neighborhood} onChangeText={text => setNeighborhood(text)} placeholder="Neighborhood"></TextInput>
            <TextInput style={styles.textInput} value={phone} onChangeText={text => setPhone(text)} placeholder="Phone"></TextInput>
            <TouchableHighlight style={styles.createButton} onPress={updateUser}>
                <Text style={styles.textCreateButton}>Update Appointment</Text>
            </TouchableHighlight>

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
    textInput: {
        backgroundColor: "white",
        marginTop: 10,
        padding: 13,
        borderColor: "#00716F",
        borderWidth: 1,
        borderRadius: 5,
        width: Dimensions.get('screen').width * 0.9
    },
    createButton: {
        marginHorizontal: 65,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#00716F",
        paddingVertical: 10,
        borderRadius: 23,
        paddingHorizontal: 30
    },
    textCreateButton: {
        color: "white",
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: 16
    },
    image: {
        width: 280,
        height: 130,
        marginTop: 10
    },
    text: {
        color: "#00716F",
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: 24,
        paddingTop: 10
    }
});
export default UpdateUser
