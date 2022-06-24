import { TouchableOpacity, Image, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function cardImage({ image }) {

  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ImageScreen', {image})} style={style.cardImage}>
      <Image
        source={{ uri: `${image.src.medium}` }}
        style={{ width: '100%', height: 180, borderRadius: 10}}
      />
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  cardImage: {
    display: 'flex',
    width: '50%',
    padding: 5,
    justifyContent: 'space-between',
  }
})