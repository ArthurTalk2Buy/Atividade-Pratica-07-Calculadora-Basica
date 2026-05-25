# Atividade Prática 07 – Calculadora Básica

Calculadora em React Native (Expo) com quatro operações básicas, tema claro/escuro e controle de tamanho da fonte.

## Estrutura

```
App.js
src/
  shared/
    CalcContext.js   — estado global (números, tema, fonte, resultado)
    calcUtils.js     — lógica das operações
    theme.js         — cores dos temas
    appShared.js     — componentes compartilhados (Switch, Slider, inputs)
  telas/
    tela1.js         — Soma
    tela2.js         — Multiplicação
    tela3.js         — Divisão
    tela4.js         — Subtração
    tela5.js         — Resultado
```

## Requisitos atendidos

- **Tela1–4:** uma tela para cada operação (+, ×, ÷, −)
- **Tela5:** exibe expressão e resultado (ou mensagem de erro)
- **Switch:** alterna tema escuro / claro
- **Slider:** ajusta o tamanho da fonte (14–32 px)

## Como executar

```bash
npm install
npx expo start
```

## Snack Expo

1. Acesse [https://snack.expo.dev](https://snack.expo.dev)
2. Crie um novo projeto e copie os arquivos deste repositório
3. Adicione a dependência `@react-native-community/slider` nas dependências do Snack
4. Salve e copie o link para entregar no Teams

## GitHub

Repositório sugerido para portfólio: publique este projeto no GitHub após testar no dispositivo ou emulador.
