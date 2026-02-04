import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PrivacyScreen() {
    const router = useRouter();

    // URLs das imagens (adaptar conforme a estrutura do projeto)
    // Assumindo que assets podem ser importados assim ou movidos para pasta assets
    // Vou usar os caminhos relativos prováveis
    const iconImage = require('../assets/images/icon.png');
    const bannerImage = require('../assets/images/banner.png');

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.container}
        >
            <View style={styles.headerNav}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Image source={iconImage} style={styles.logo} />
                        <Text style={styles.title}>Política de Privacidade</Text>
                        <Text style={styles.subtitle}>App Previsão do Tempo</Text>
                    </View>

                    <Image source={bannerImage} style={styles.banner} />

                    <Text style={styles.date}>Última atualização: 02 de Fevereiro de 2026</Text>

                    <Text style={styles.paragraph}>
                        A sua privacidade é importante para nós. Esta política de privacidade explica como o aplicativo <Text style={styles.bold}>Previsão do Tempo</Text> coleta, usa e protege as suas informações.
                    </Text>

                    <Text style={styles.sectionTitle}>1. Coleta e Uso de Informações</Text>
                    <Text style={styles.paragraph}>
                        O aplicativo Previsão do Tempo tem como principal funcionalidade exibir dados meteorológicos baseados na cidade informada pelo usuário.
                    </Text>
                    <View style={styles.list}>
                        <Text style={styles.listItem}>• <Text style={styles.bold}>Dados de Entrada:</Text> Coletamos o nome da cidade que você digita na barra de busca para consultar a previsão do tempo.</Text>
                        <Text style={styles.listItem}>• <Text style={styles.bold}>Uso dos Dados:</Text> O nome da cidade é enviado para a API do OpenWeatherMap para obter os dados climáticos atuais. Não armazenamos essa informação em nossos servidores; ela é usada apenas momentaneamente para realizar a consulta.</Text>
                    </View>

                    <Text style={styles.sectionTitle}>2. Permissões do Dispositivo</Text>
                    <Text style={styles.paragraph}>
                        O aplicativo pode solicitar acesso à internet (Wi-Fi ou dados móveis) para conectar-se aos serviços de meteorologia.
                    </Text>

                    <Text style={styles.sectionTitle}>3. Compartilhamento de Dados</Text>
                    <Text style={styles.paragraph}>
                        O aplicativo não compartilha suas informações pessoais com terceiros, exceto conforme necessário para fornecer o serviço (por exemplo, enviando o nome da cidade para o provedor de dados meteorológicos OpenWeatherMap).
                    </Text>

                    <Text style={styles.sectionTitle}>4. Serviços de Terceiros</Text>
                    <Text style={styles.paragraph}>
                        Utilizamos a API do <Text style={styles.bold}>OpenWeatherMap</Text> para fornecer informações sobre o clima. Recomendamos que você leia a política de privacidade deles para entender como eles tratam os dados processados.
                    </Text>

                    <Text style={styles.sectionTitle}>5. Segurança</Text>
                    <Text style={styles.paragraph}>
                        Valorizamos a sua confiança em nos fornecer suas informações, e nos esforçamos para usar meios comercialmente aceitáveis de protegê-las. No entanto, lembre-se que nenhum método de transmissão pela internet ou método de armazenamento eletrônico é 100% seguro e confiável.
                    </Text>

                    <Text style={styles.sectionTitle}>6. Alterações nesta Política de Privacidade</Text>
                    <Text style={styles.paragraph}>
                        Podemos atualizar nossa Política de Privacidade de tempos em tempos. Assim, aconselhamos que você revise esta página periodicamente para quaisquer alterações. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página.
                    </Text>

                    <Text style={styles.sectionTitle}>7. Contato</Text>
                    <Text style={styles.paragraph}>
                        Se você tiver alguma dúvida ou sugestão sobre nossa Política de Privacidade, não hesite em nos contatar.
                    </Text>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>&copy; 2026 App Previsão do Tempo. Todos os direitos reservados.</Text>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerNav: {
        marginTop: 50,
        marginLeft: 20,
        zIndex: 10,
    },
    backButton: {
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    content: {
        padding: 20,
        paddingTop: 10,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.18)',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#eee',
        textAlign: 'center',
    },
    banner: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 20,
        resizeMode: 'cover',
    },
    date: {
        color: '#ccc',
        fontStyle: 'italic',
        marginBottom: 15,
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.3)',
        paddingBottom: 5,
    },
    paragraph: {
        fontSize: 16,
        color: '#eee',
        lineHeight: 24,
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    list: {
        marginLeft: 10,
        marginBottom: 10,
    },
    listItem: {
        fontSize: 16,
        color: '#eee',
        lineHeight: 24,
        marginBottom: 5,
    },
    footer: {
        marginTop: 30,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
    },
    footerText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
    },
});
