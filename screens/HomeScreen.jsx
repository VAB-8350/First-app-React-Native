import { View , TextInput, Button, StyleSheet, Text} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getImages, nextPage } from '../api/pexels'
import ImageList from '../Components/ImageList'

export default function HomeScreen ({ openSearch, setOpenSearch }) {

  const [text, onChangeText] = React.useState('')
  const [images, setImages] = useState(false)

  const loadImages = async (search) => {
   const res = await getImages(search)
   setImages(res)
  }

  useEffect(() => {
    loadImages()
  }, [])

  const handleSearch = async (value) => {
    await loadImages(value)
    onChangeText('')
    setOpenSearch(false)
  }

  const next = async (url) => {
    const res = await nextPage(url)
    setImages(res)
  }

  return (
    <>
      {
        openSearch &&
          <View style={style.boxSearch}>
            <TextInput value={text} onChangeText={onChangeText} style={style.textInput} placeholder='Search image' placeholderTextColor='#666'/>
            <Button
              title='Search'
              color='#1ED200'
              onPress={() => handleSearch(text)}
            />
          </View>
      }

      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 5, backgroundColor: '#4c4c4c'}}>
        <Text style={{color: '#d0d0d0', textAlign: 'right', fontSize: 16}} >{images.total_results} Resultados</Text>
        <Text style={{color: '#5e5', textAlign: 'right', fontSize: 16, fontWeight: 'bold'}} onPress={() => next(images.next_page)}>Next page >></Text>
      </View>

      <View style={{backgroundColor: '#4c4c4c', height: '100%', flex: 1}}>
        {
          images &&
          <ImageList listImage={images} />
        }
      </View>
    </>
  )
}

const style = StyleSheet.create({
  boxSearch: {
    position: 'absolute',
    zIndex:1,
    width: '90%',
    top: '30%',
    alignSelf: 'center',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10
  },
  textInput: {
    fontSize:20,
    padding: 5,
    backgroundColor: '#333',
    color: '#cdcdcd',
    borderWidth: 1,
    borderColor: '#333',
    borderBottomColor: '#1ED200',
    marginBottom: 20
  }
})