import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
    const router = useRouter();

    const openExternalLink = () => {
        Linking.openURL('https://openweathermap.org/');
    };

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.container}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <Ionicons name="cloud-outline" size={80} color="#fff" />
                    <Text style={styles.title}>App Previsão do Tempo</Text>
                    <Text style={styles.subtitle}>Escolha uma opção abaixo</Text>
                </View>

                <View style={styles.menu}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push('/weather' as any)}
                    >
                        <Ionicons name="partly-sunny" size={30} color="#4c669f" style={styles.icon} />
                        <Text style={styles.buttonText}>Previsão do Tempo</Text>
                        <Ionicons name="chevron-forward" size={24} color="#666" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push('/privacy' as any)}
                    >
                        <Ionicons name="document-text" size={30} color="#4c669f" style={styles.icon} />
                        <Text style={styles.buttonText}>Política de Privacidade</Text>
                        <Ionicons name="chevron-forward" size={24} color="#666" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={openExternalLink}
                    >
                        <Ionicons name="globe-outline" size={30} color="#4c669f" style={styles.icon} />
                        <Text style={styles.buttonText}>Ir para OpenWeatherMap</Text>
                        <Ionicons name="open-outline" size={24} color="#666" />
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Versão 1.0.0</Text>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 50,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#ddd',
        marginTop: 10,
    },
    menu: {
        gap: 20, // Espaçamento entre os botões
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        elevation: 5, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    icon: {
        marginRight: 15,
    },
    buttonText: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    footer: {
        marginTop: 50,
        alignItems: 'center',
    },
    footerText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
    },
});