# App Previsão do Tempo 🌦️

Um aplicativo moderno e elegante de previsão do tempo desenvolvido com **React Native** e **Expo**. Este projeto permite que os usuários verifiquem o clima atual de qualquer cidade do mundo, utilizando a API do OpenWeatherMap.

## 📱 Funcionalidades

- **Consulta de Clima:** Busque pela cidade e veja a temperatura, umidade, velocidade do vento e condições climáticas.
- **Interface Moderna:** Design rico com Glassmorphism (efeito vidro) e gradientes lineares.
- **Navegação Fluida:** Estrutura de navegação gerenciada pelo **Expo Router**.
- **Telas:**
  - **Home:** Menu principal intuitivo.
  - **Previsão:** Tela detalhada com os dados meteorológicos.
  - **Privacidade:** Tela de política de privacidade informativa.

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Axios](https://axios-http.com/) (Consumo de API)
- [OpenWeatherMap API](https://openweathermap.org/) (Dados Meteorológicos)
- [Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)

## 🚀 Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/prof-freedson/app-previsao-tempo.git
   cd app-previsao-tempo
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configuração da API Key:**
   - Crie um arquivo `.env` na raiz do projeto.
   - Adicione sua chave do OpenWeatherMap:
     ```env
     EXPO_PUBLIC_WEATHER_API_KEY=sua_chave_api_aqui
     ```

4. **Execute o projeto:**
   ```bash
   npx expo start
   ```

## 📂 Estrutura do Projeto

```
app-previsao-tempo/
├── app/
│   ├── _layout.tsx      # Layout e rotas
│   ├── index.tsx        # Tela Principal
│   ├── weather.tsx      # Tela de Clima
│   └── privacy.tsx      # Tela de Privacidade
├── assets/              # Imagens e ícones
└── ...
```


