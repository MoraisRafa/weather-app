import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Alert, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, React } from 'react';


export function Home() {
    const [city, setCity] = useState('')
    const [place, setPlace] = useState('')
    const [country, setCountry] = useState('')
    const [temp, setTemp] = useState('')
    const [icon, setIcon] = useState('')
    const [max, setMax] = useState('')
    const [min, setMin] = useState('')

    const search = city.trim()

    async function getDataApi() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=6f16ddea0057f3ac9ed488d42b840a07`)
        const data = await response.json()

        if (data?.cod && data.cod === "404")
            Alert.alert('Cidade não encontrada')

        loadData(data)
        setCity('')
        Keyboard.dismiss()
    }

    function loadData(data) {
        setPlace(data.name)
        setCountry(data.sys.country)
        setTemp(Math.floor(data.main.temp))
        setIcon(data.weather[0].icon)
        setMax(Math.floor(data.main.temp_max))
        setMin(Math.floor(data.main.temp_min))
    }

    const iconNames = {
        '01d': 'sunny',
        '02d': 'partly-sunny',
        '03d': 'cloud',
        '04d': 'cloud',
        '09d': 'rainy',
        '10d': 'rainy',
        '11d': 'thunderstorm',
        '13d': 'snow',
        '50d': 'cloudy',
        '01n': 'moon',
        '02n': 'cloudy-night',
        '03n': 'cloud',
        '04n': 'cloud',
        '09n': 'rainy',
        '10n': 'rainy',
        '11n': 'thunderstorm',
        '13n': 'snow',
        '50n': 'cloudy'
    };

    const weather = () => {
        const iconName = iconNames[icon];
        return (<Ionicons name={iconName} color="white" size={250} />);
    }

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput
                    style={styles.input}
                    placeholder='Digite o nome da cidade...'
                    placeholderTextColor='#999999'
                    value={city}
                    onChangeText={setCity}
                />
                <TouchableOpacity style={styles.button} onPress={getDataApi} >
                    <Ionicons name="search-sharp" size={40} color="#000" flex="1" />
                </TouchableOpacity>
            </View>
            <View style={styles.weatherContainer}>
                <View>
                    <Text style={styles.city}>{place}</Text>
                    <Text style={styles.city}>{country}</Text>
                </View>

                <View>
                    {weather()}
                    <Text style={styles.weatherTemp}>{temp}°C</Text>
                </View>

                <View style={styles.weatherContentMini}>
                    <View style={styles.weatherMiniTemp} ><Text style={styles.weatherMiniText}>Máx: {max}°C</Text></View>
                    <View style={styles.weatherMiniTemp} ><Text style={styles.weatherMiniText}>Min: {min}°C </Text></View>
                </View>

            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#0a0a0a',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
    },
    search: {
        flexDirection: 'row',
    },
    input: {
        fontFamily: 'ChakraPetch_700Bold',
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
        width: '75%',
        height: 60,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 24,
    },
    button: {
        backgroundColor: "#FFF",
        width: 60,
        height: 60,
        borderRadius: 100,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    weatherContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    city: {
        fontFamily: 'ChakraPetch_700Bold',
        fontSize: 60,
        textAlign: 'center',
        color: '#fff',
    },
    weatherTemp: {
        fontFamily: 'ChakraPetch_700Bold',
        fontSize: 100,
        textAlign: 'center',
        color: '#fff',
    },
    weatherContentMini: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
        borderColor: '#fff',

    },
    weatherMiniTemp: {
        width: '30%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 24,
        borderColor: '#fff',
    },
    weatherMiniText: {
        fontFamily: 'ChakraPetch_400Regular',
        fontSize: 50,
        textAlign: 'center',
        color: '#fff',
    },
}
)
