import { View, FlatList, Text } from 'react-native'
import React from 'react'
import CardImage from './CardImage'


export default function HomeScreen({ listImage }) {

  return (
    <View style={{ width: '100%', height: '100%', flex: 1}}>
      <FlatList
      data={listImage.photos}
      numColumns={2}
      renderItem={({item}) => <CardImage image={item} />}
      />
    </View>
  )
}