import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

import * as WebBrowser from 'expo-web-browser'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'

import ImageList from '../Components/ImageList'
import { getImages } from '../api/pexels'

export default function ImageScreen ({ route }) {
  const { image } = route.params

  const [images, setImages] = useState(false)

  const loadImages = async () => {
    const res = await getImages()
    setImages(res)
   }

   useEffect(() => {
     loadImages()
   }, [])

  const handleProfile = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  }

  const downloadFile = async () => {

    try {
      let fileUri = FileSystem.documentDirectory + 'image.id' + '.jpeg'
      const {uri} = await FileSystem.downloadAsync(image.src.original, fileUri)
      saveFile(uri)

    } catch (error) {
      console.log(error)
    }
  }

  const saveFile = async (fileUri) => {
    const {status} = await MediaLibrary.requestPermissionsAsync()

    if (status === 'granted'){
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      await MediaLibrary.createAlbumAsync('Download', asset, false)
    }
  }

  const handleDownload = () => {
    downloadFile()
  }


  return (
    <ScrollView style={{backgroundColor: '#4c4c4c'}}>
      <Image source={{uri: image.src.large2x}} style={{height:350}} />

      <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginVertical: 20, justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{backgroundColor: '#b32', height:50, width: 50, borderRadius: 50, marginRight: 15, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize:20, fontWeight: 'bold', color: '#fff'}}>{image.photographer.split(' ').map(str => str[0]).join('').toUpperCase()}</Text>
          </View>

          <TouchableOpacity onPress={() => handleProfile(image.photographer_url)}>
            <Text style={{color: '#cecece', fontSize: 20, fontWeight: 'bold'}}>{image.photographer}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleDownload}>
          <Text style={{backgroundColor: '#3b6', padding: 10, color: '#333', fontSize: 20, fontWeight: 'bold', borderRadius: 5}}>Download</Text>
        </TouchableOpacity>
      </View>

    <ImageList  listImage={images}/>

    </ScrollView>
  )
}