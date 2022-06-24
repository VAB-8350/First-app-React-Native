import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ImageScreen from './screens/ImageScreen';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';


const Stack = createNativeStackNavigator()

export default function App() {

  const [openSearch, setOpenSearch] = useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='HomeScreen'
          options={{
            headerLeft:() => 
              <Image source={{uri: 'https://deex.co.kr/wp-content/uploads/2018/09/14bb2b8dac7d9345_256x256.png' }} style={style.icon}/>,

            headerRight: () => 
              <TouchableHighlight onPress={() => setOpenSearch(!openSearch)}>
                <Text style={style.search} >{openSearch ? 'Close' : 'Search'}</Text>
              </TouchableHighlight>,

            title: 'Native Galery',

            headerTitleStyle:{
              color: '#cecece',
              fontWeight: 'bold'
            },

            headerStyle: {
              backgroundColor: '#0d0d0d',
            }
          }}
        > 
          {(props) => <HomeScreen {...props} openSearch={openSearch} setOpenSearch={setOpenSearch} />} 
        </Stack.Screen>

        <Stack.Screen name='ImageScreen' component={ImageScreen}
          options={{

            headerTintColor: '#cecece',

            headerTitleStyle:{
              color: '#cecece',
              fontWeight: 'bold'
            },

            headerStyle: {
              backgroundColor: '#0d0d0d',
            }
          }}
        ></Stack.Screen>
      </Stack.Navigator>
      <StatusBar style={{backgroundColor: '#fff'}} />
    </NavigationContainer>
  );
}


const style = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 10,
  },
  search: {
    color: '#cecece',
    fontWeight: 'bold',
    fontSize: 17
  }
})