
import { StatusBar } from 'react-native';
import { useFonts, ChakraPetch_400Regular, ChakraPetch_700Bold } from '@expo-google-fonts/chakra-petch'

import { Loading } from './src/components/Loading';
import { Home } from './src/screens/Home';

export default function App() {

  let [fontsLoaded] = useFonts({
    ChakraPetch_400Regular,
    ChakraPetch_700Bold,
  })

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <Home />
      <StatusBar barStyle="default" backgroundColor="transparent" translucent />
    </>
  )
}