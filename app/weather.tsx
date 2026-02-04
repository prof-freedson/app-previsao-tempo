import { Ionicons } from '@expo/vector-icons'; // Ícones
import axios from 'axios'; // Para requisições HTTP
import { LinearGradient } from 'expo-linear-gradient'; // Para o fundo degradê
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// A chave API é carregada do arquivo .env (EXPO_PUBLIC_WEATHER_API_KEY)
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export default function WeatherScreen() {
    const router = useRouter();
    const [cidade, setCidade] = useState('');
    const [clima, setClima] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Função para buscar dados do clima
    const buscarClima = async () => {
        if (!cidade.trim()) {
            Alert.alert('Erro', 'Por favor, digite o nome de uma cidade.');
            return;
        }

        setLoading(true);
        Keyboard.dismiss(); // Esconde o teclado


        try {
            // Endpoint de clima atual
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`
            );
            setClima(response.data);
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Cidade não encontrada ou erro na conexão.');
            setClima(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            // Gradiente bonito de fundo (Azul escuro para roxo)
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Previsão do Tempo</Text>

                {/* Campo de Busca */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a cidade (ex: São Paulo)"
                        placeholderTextColor="#ddd"
                        value={cidade}
                        onChangeText={setCidade}
                    />
                    <TouchableOpacity onPress={buscarClima} style={styles.button}>
                        <Ionicons name="search" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Loading Indicator */}
                {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}

                {/* Card de Informações do Clima */}
                {clima && !loading && (
                    <View style={styles.weatherCard}>
                        <Text style={styles.cityName}>{clima.name}, {clima.sys.country}</Text>

                        <View style={styles.tempContainer}>
                            {/* Ícone dinâmico baseado no clima */}
                            <Ionicons
                                name={getIconName(clima.weather[0].main)}
                                size={80}
                                color="#fff"
                            />
                            <Text style={styles.temp}>{Math.round(clima.main.temp)}°C</Text>
                        </View>

                        <Text style={styles.description}>
                            {clima.weather[0].description.toUpperCase()}
                        </Text>

                        <View style={styles.detailsContainer}>
                            <View style={styles.detailItem}>
                                <Ionicons name="water-outline" size={20} color="#fff" />
                                <Text style={styles.detailText}>Umidade: {clima.main.humidity}%</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Ionicons name="speedometer-outline" size={20} color="#fff" />
                                <Text style={styles.detailText}>Vento: {clima.wind.speed} m/s</Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </LinearGradient>
    );
}

// Helper para escolher o ícone com base no clima principal
function getIconName(weatherMain: string) {
    switch (weatherMain) {
        case 'Clear': return 'sunny-outline';
        case 'Clouds': return 'cloudy-outline';
        case 'Rain': return 'rainy-outline';
        case 'Thunderstorm': return 'thunderstorm-outline';
        case 'Snow': return 'snow-outline';
        case 'Drizzle': return 'rainy-outline';
        default: return 'partly-sunny-outline';
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: 50,
        marginLeft: 20,
    },
    backButton: {
        padding: 5,
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.2)', // Efeito vidro semi-transparente
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 18,
        paddingVertical: 10,
    },
    button: {
        padding: 10,
    },
    weatherCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glassmorphism
        borderRadius: 20,
        padding: 20,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    cityName: {
        fontSize: 28,
        fontWeight: '600',
        color: '#fff',
    },
    tempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    temp: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 15,
    },
    description: {
        fontSize: 20,
        color: '#eee',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 16,
    },
});
