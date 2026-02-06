# Tutorial: App de Previsão do Tempo com React Native e Expo

## 1. Objetivo e Resumo
Este tutorial tem como objetivo criar um aplicativo completo de previsão do tempo para Android. O app contará com uma **Tela Inicial** com menu de navegação, uma **Tela de Previsão** (onde o usuário digita a cidade) e uma **Tela de Política de Privacidade**. Focaremos em uma interface moderna (UI rica) e no uso do **Expo Router** para navegação, cobrindo desde a criação do projeto até a geração do arquivo APK e publicação na loja alternativa APKPure.

**Passos a serem executados:**
1.  Configuração do ambiente e criação do projeto Expo.
2.  Instalação de dependências (Axios para API, Ícones, Gradientes).
3.  Obtenção da API Key no OpenWeatherMap.
4.  Desenvolvimento da interface e lógica com React Native.
5.  Personalização do ícone e nome do app.
6.  Geração do build (APK) usando EAS (Expo Application Services).
7.  Publicação do aplicativo na APKPure.

---

## 2. Estrutura de Pastas e Arquivos
A estrutura sugerida segue o padrão do **Expo Router**:

```
app-previsao-tempo/
├── app/
│   ├── _layout.tsx      # Configuração global de rotas e estilos
│   ├── index.tsx        # Tela Inicial (Menu principal)
│   ├── weather.tsx      # Tela de Previsão do Tempo
│   └── privacy.tsx      # Tela de Política de Privacidade
├── assets/
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png         # Ícone do App (512x512)
│   └── splash.png
├── app.json             # Configurações do Expo (nome, slug, versão, ícone)
├── eas.json             # Configurações de Build do EAS
├── .env                 # Variáveis de ambiente (API Key)
├── package.json         # Dependências
└── tsconfig.json
```

---

## 3. Criação do App e Instalação de Pacotes

Abra seu terminal na pasta onde deseja criar o projeto e execute:

### 3.1. Criar o Projeto
```bash
# Cria o projeto usando o template padrão
npx create-expo-app@latest app-previsao-tempo

# Navegue para a pasta do projeto
cd app-previsao-tempo
```

### 3.2. Instalar Bibliotecas Necessárias
Instalaremos o `axios` para requisições HTTP e o `expo-linear-gradient` para criar fundos esteticamente agradáveis. O pacote de ícones `@expo/vector-icons` já vem instalado por padrão no Expo, mas garantiremos sua presença.

```bash
# Instala o Axios, Linear Gradient e dependências do Expo Router
npx expo install axios expo-linear-gradient expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

---

## 4. Obtendo a Chave da API (OpenWeatherMap)

Para consultar o clima, usaremos a API gratuita do OpenWeatherMap.

1.  Acesse [openweathermap.org](https://openweathermap.org/) e clique em **"Sign in"** ou **"Create Account"**.
2.  Após criar a conta e verificar seu e-mail, faça login.
3.  No painel, clique na aba **"API keys"**.
4.  Você verá uma "Default" key ou poderá gerar uma nova.
5.  **Copie essa chave**. Você a usará no código.

> **Nota:** A chave pode levar de 1 a 2 horas para ser ativada após a criação. Se receber erro 401 inicialmente, aguarde um pouco.

---

## 4.1 Configurando Variáveis de Ambiente (.env)

Para não deixar a chave da API exposta diretamente no código (o que não é uma boa prática), usaremos um arquivo `.env`.

1.  Na raiz do projeto, crie um arquivo chamado `.env`.
2.  Adicione a seguinte linha dentro dele (substitua pela sua chave):

```env
EXPO_PUBLIC_WEATHER_API_KEY=sua_chave_aqui_sem_aspas
```

> **Atenção:** No Expo, variáveis que precisam ser acessíveis no código do app (front-end) devem começar com o prefixo `EXPO_PUBLIC_`.

---

## 5. Desenvolvimento do Código

Abaixo estão os códigos principais. Organizamos o app em três telas: Menu Inicial (`index.tsx`), Previsão (`weather.tsx`) e Privacidade (`privacy.tsx`).

### 5.1. `app/_layout.tsx`
Configuração básica para manter a barra de status transparente e definir a navegação.

```tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
```

### 5.2. `app/index.tsx` (Tela Inicial)
Esta tela serve como um menu principal, direcionando o usuário para as funcionalidades do app.

```tsx
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
```

### 5.3. `app/weather.tsx` (Tela de Previsão)
Esta tela contém a lógica da API de clima.

```tsx
import { Ionicons } from '@expo/vector-icons'; // Ícones
import axios from 'axios'; // Para requisições HTTP
import { LinearGradient } from 'expo-linear-gradient'; // Para o fundo degradê
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
import { useRouter } from 'expo-router';

// A chave API é carregada do arquivo .env
// Certifique-se de ter criado o arquivo .env na raiz do projeto com:
// EXPO_PUBLIC_WEATHER_API_KEY=sua_chave_openweather
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
```

### 5.4. `app/privacy.tsx` (Política de Privacidade)
Tela de Política de Privacidade.

```tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PrivacyScreen() {
    const router = useRouter();

    // Use imagens locais
    const iconImage = require('../assets/icon.png');
    // Para o banner, você pode adicionar uma imagem 'banner.png' em assets ou usar outra imagem
    const bannerImage = require('../assets/splash.png'); 

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
```

> **IMPORTANTE: API Key no APK Final**
> Ao gerar o APK com o EAS, o arquivo `.env` local não é incluído por segurança. Para que sua API Key funcione no app instalado:
> 1.  **Opção Rápida:** Coloque a chave diretamente no código em `app/weather.tsx` (substituindo o `process.env...` pela string da chave).
> 2.  **Opção Profissional:** Use os "Secrets" do EAS. Rode no terminal: `eas secret:create --scope project --name EXPO_PUBLIC_WEATHER_API_KEY --value SUA_CHAVE`.

---

## 6. Modificação do Ícone e Nome do App

Para personalizar a identidade do seu aplicativo:

1.  **Nome do App**: Abra o arquivo `app.json` e altere a propriedade `name`.
    ```json
    {
      "expo": {
        "name": "Meu Clima App",
        "slug": "app-previsao-tempo",
        ...
      }
    }
    ```
2.  **Ícone**:
    *   Crie uma imagem de **1024x1024px** (para garantir qualidade).
    *   Salve como `icon.png` e substitua o arquivo em `assets/icon.png`.
    *   O Expo gerará automaticamente os ícones para Android e iOS.
    *   Substitua também `adaptive-icon.png` e `splash.png` se desejar.

> **OBSERVAÇÃO:**
> Um dos sites mais usados para gerar ícones para aplicativos é o [App Icon Generator](https://appicon.co/). A imagem do aplicativo a ser usada nesse site pode ser gerada com ferramentas de inteligência artificial, como o ChatGPT, Copilot ou Gemini (através do Nano Banana).

---

## 7. Deployment com EAS (Gerando o APK)

Agora vamos transformar o código em um arquivo APK instalável no Android.

### 7.1. Instalar EAS CLI e Login
```bash
# Instala o EAS CLI globalmente (se ainda não tiver)
npm install -g eas-cli

# Faça login na sua conta Expo
eas login
```

### 7.2. Configurar o Projeto
```bash
# Cria o ID do projeto e o arquivo eas.json
eas build:configure
```
*   Responda `Android` quando perguntado sobre a plataforma (ou All).

### 7.3. Configurar para Gerar APK (eas.json)
Por padrão, o EAS gera um `.aab` (App Bundle) para a Play Store. Para testes ou APKPure, queremos um `.apk`.
Abra o arquivo `eas.json` e modifique o perfil `preview` (ou crie um novo):

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "preview4": {
      "distribution": "internal"
    },
    "production": {}
  }
}

```

### 7.4. Executar o Build
```bash
# Gera o APK
eas build -p android --profile preview
```
*   O processo acontecerá na nuvem.
*   Ao finalizar, o terminal mostrará um link para baixar o arquivo `.apk`.
*   Baixe-o e transfira para seu celular para testar.

---

## 8. Publicação na APKPure

A APKPure é uma loja alternativa popular que permite publicar arquivos APK/XAPK diretamente.

### Passo 1: Conta de Desenvolvedor
1.  Acesse o [Console de Desenvolvedor da APKPure](https://developer.apkpure.com/).
2.  Crie uma conta ou faça login. Caso tenha uma conta de email do Google, essa poderá ser usada.
3.  Preencha seu perfil de desenvolvedor (Nome, Site, etc.).

### Passo 2: Preparar os Materiais
Tenha em mãos:
*   **Nome do pacote** (geralmente `com.seuusuario.appprevisaotempo`).
*   O arquivo **.apk** gerado no passo anterior.
*   **Ícone** (512x512 PNG/JPG).
*   **Screenshots** (Capturas de tela do app funcionando, desde que seja mais de uma captura e de acordo com os requisitos solicitados no campo de upload de screenshots).
*   **Política de Privacidade** (mesmo que seja simples, hospedada noGitHub Pages ou no Vercel).
*   **Feature Graphic** é uma imagem que representa o app, como se fosse uma capa ou um banner. Deve ter 1024x500 pixels.
*   **Descrição** curta e completa do aplicativo. Fique atento ao limite de caracteres.

> **OBSERVAÇÃO:**
> Na edição dos dados do app, permaneceça com a opção **"Default language"** selecionada.

### Passo 3: Criar e Enviar
1.  No dashboard, clique em **"Add Application"**.
2.  Preencha o **Nome do App** e a **Categoria** (Weather).
3.  Envie (Upload) o seu arquivo `.apk`. O sistema detectará o pacote automaticamente (ex: `com.seuusuario.appprevisaotempo`).
4.  Preencha os detalhes da loja:
    *   Upload do Ícone e Screenshots.
    *   Insira a descrição.
    *   Defina a classificação etária (Livre).
    *   **Importante (2025):** Insira uma URL de **Política de Privacidade** (mesmo que seja simples, hospedada no GitHub Pages ou no Vercel).
5.  Clique em **"Save"**. Caso esteja tudo certo, clique em **"Publish"** no topo da página.

### Passo 4: Aprovação
A equipe da APKPure revisará o app (geralmente leva de 24 a 72 horas). Após aprovado, seu app estará disponível para download mundialmente.

---

