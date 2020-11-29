import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, Alert } from 'react-native';


function CardComponent(props){
    const {name, lastname, identification} = props.user;
    return(
        <View>
            <Text>{name + " " + lastname}</Text>
            <Text>{identification}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    
  });

  export default CardComponent