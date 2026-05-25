import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCalc } from './CalcContext';
import { calcular } from './calcUtils';
import { TEMA_CLARO, TEMA_ESCURO, RAIO } from './theme';

export function useTema() {
  const { temaEscuro } = useCalc();
  return temaEscuro ? TEMA_ESCURO : TEMA_CLARO;
}

export function AppShell({ children }) {
  const tema = useTema();

  return (
    <View style={[styles.fundo, { backgroundColor: tema.fundo }]}>
      <StatusBar style={tema.statusBar} />
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </View>
  );
}

export function Configuracoes() {
  const { temaEscuro, setTemaEscuro, tamanhoFonte, setTamanhoFonte } = useCalc();
  const tema = useTema();

  return (
    <View style={[styles.configCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
      <View style={styles.configLinha}>
        <View style={styles.configTexto}>
          <Text style={[styles.configTitulo, { color: tema.texto, fontSize: tamanhoFonte * 0.85 }]}>
            Tema escuro
          </Text>
          <Text style={[styles.configSub, { color: tema.textoSecundario, fontSize: tamanhoFonte * 0.7 }]}>
            {temaEscuro ? 'Ativado' : 'Desativado'}
          </Text>
        </View>
        <Switch
          value={temaEscuro}
          onValueChange={setTemaEscuro}
          trackColor={{ false: tema.switchTrack, true: tema.destaque }}
          thumbColor={temaEscuro ? tema.destaqueClaro : '#f8fafc'}
        />
      </View>

      <View style={styles.sliderBloco}>
        <Text style={[styles.configTitulo, { color: tema.texto, fontSize: tamanhoFonte * 0.85 }]}>
          Tamanho da fonte: {Math.round(tamanhoFonte)}px
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={14}
          maximumValue={32}
          step={1}
          value={tamanhoFonte}
          onValueChange={setTamanhoFonte}
          minimumTrackTintColor={tema.destaque}
          maximumTrackTintColor={tema.borda}
          thumbTintColor={tema.destaque}
        />
      </View>
    </View>
  );
}

export function TelaTitulo({ titulo, operador }) {
  const { tamanhoFonte } = useCalc();
  const tema = useTema();

  return (
    <View style={styles.tituloBloco}>
      <Text style={[styles.operadorBadge, { color: tema.destaque, fontSize: tamanhoFonte * 1.6 }]}>
        {operador}
      </Text>
      <Text style={[styles.titulo, { color: tema.texto, fontSize: tamanhoFonte * 1.4 }]}>
        {titulo}
      </Text>
      <Text style={[styles.subtitulo, { color: tema.textoSecundario, fontSize: tamanhoFonte * 0.85 }]}>
        Informe dois números e calcule
      </Text>
    </View>
  );
}

export function CampoNumero({ label, value, onChangeText }) {
  const { tamanhoFonte } = useCalc();
  const tema = useTema();

  return (
    <View style={styles.campo}>
      <Text style={[styles.campoLabel, { color: tema.textoSecundario, fontSize: tamanhoFonte * 0.8 }]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: tema.inputFundo,
            borderColor: tema.borda,
            color: tema.texto,
            fontSize: tamanhoFonte,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder="0"
        placeholderTextColor={tema.textoSecundario}
        keyboardType="decimal-pad"
      />
    </View>
  );
}

export function BotaoPrimario({ children, onPress }) {
  const { tamanhoFonte } = useCalc();
  const tema = useTema();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.botaoPrimario, { backgroundColor: tema.destaque }]}
    >
      <Text style={[styles.botaoTexto, { fontSize: tamanhoFonte }]}>{children}</Text>
    </TouchableOpacity>
  );
}

export function NavegacaoOperacoes({ navigation, telaAtual }) {
  const { tamanhoFonte } = useCalc();
  const tema = useTema();

  const telas = [
    { nome: 'Soma', rota: 'Soma', id: 1 },
    { nome: 'Mult.', rota: 'Multiplicacao', id: 2 },
    { nome: 'Div.', rota: 'Divisao', id: 3 },
    { nome: 'Subt.', rota: 'Subtracao', id: 4 },
  ];

  return (
    <View style={styles.nav}>
      {telas.map((t) => (
        <TouchableOpacity
          key={t.rota}
          onPress={() => navigation.navigate(t.rota)}
          style={[
            styles.navBtn,
            {
              backgroundColor: telaAtual === t.id ? tema.destaque : tema.card,
              borderColor: tema.borda,
            },
          ]}
        >
          <Text
            style={[
              styles.navTexto,
              {
                color: telaAtual === t.id ? '#fff' : tema.texto,
                fontSize: tamanhoFonte * 0.75,
              },
            ]}
          >
            {t.nome}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export function TelaOperacao({ titulo, operador, simboloCalc, telaAtual, navigation }) {
  const {
    numero1,
    setNumero1,
    numero2,
    setNumero2,
    setOperador,
    setExpressao,
    setResultado,
    setErro,
  } = useCalc();
  const tema = useTema();

  function handleCalcular() {
    setOperador(simboloCalc);
    const res = calcular(simboloCalc, numero1, numero2);

    if (res.erro) {
      setErro(res.erro);
      setExpressao('');
      setResultado('');
    } else {
      setErro('');
      setExpressao(res.expressao);
      setResultado(res.resultado);
    }
    navigation.navigate('Resultado');
  }

  return (
    <AppShell>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TelaTitulo titulo={titulo} operador={operador} />
        <Configuracoes />
        <View style={[styles.formCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <CampoNumero label="Primeiro número" value={numero1} onChangeText={setNumero1} />
          <CampoNumero label="Segundo número" value={numero2} onChangeText={setNumero2} />
        </View>
        <BotaoPrimario onPress={handleCalcular}>Calcular {operador}</BotaoPrimario>
        <NavegacaoOperacoes navigation={navigation} telaAtual={telaAtual} />
      </ScrollView>
    </AppShell>
  );
}

export const styles = StyleSheet.create({
  fundo: { flex: 1 },
  safeArea: { flex: 1 },
  content: {
    flexGrow: 1,
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  tituloBloco: { alignItems: 'center', marginBottom: 4 },
  operadorBadge: { fontWeight: '900', marginBottom: 4 },
  titulo: { fontWeight: '800', textAlign: 'center' },
  subtitulo: { fontWeight: '500', marginTop: 4, textAlign: 'center' },
  configCard: {
    borderRadius: RAIO.lg,
    borderWidth: 1,
    gap: 16,
    padding: 16,
  },
  configLinha: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  configTexto: { flex: 1 },
  configTitulo: { fontWeight: '700' },
  configSub: { marginTop: 2 },
  sliderBloco: { gap: 4 },
  slider: { height: 40, width: '100%' },
  formCard: {
    borderRadius: RAIO.lg,
    borderWidth: 1,
    gap: 14,
    padding: 16,
  },
  campo: { gap: 6 },
  campoLabel: { fontWeight: '600' },
  input: {
    borderRadius: RAIO.md,
    borderWidth: 1,
    fontWeight: '600',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  botaoPrimario: {
    alignItems: 'center',
    borderRadius: RAIO.md,
    paddingVertical: 16,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '800',
  },
  nav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 8,
  },
  navBtn: {
    borderRadius: RAIO.sm,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  navTexto: { fontWeight: '700' },
});
