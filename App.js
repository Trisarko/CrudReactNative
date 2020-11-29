import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListUsers from './screens/list-users/list-users';
import CreateUser from './screens/create-user/create-user';
import DetailUser from './screens/detail-user/detail-user';
import UpdateUser from './screens/update-user/update-user';

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ListUsers} />
        <Stack.Screen name="Create" component={CreateUser} />
        <Stack.Screen name="Detail" component={DetailUser} />
        <Stack.Screen name="Update" component={UpdateUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App