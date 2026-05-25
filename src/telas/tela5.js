import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useCalc } from '../shared/CalcContext';
import {
  AppShell,
  BotaoPrimario,
  Configuracoes,
  styles as sharedStyles,
  useTema,
} from '../shared/appShared';
import { RAIO } from '../shared/theme';

export default function Tela5({ navigation }) {
  const { tamanhoFonte, expressao, resultado, erro, operador } = useCalc();
  const tema = useTema();

  return (
    <AppShell>
      <ScrollView contentContainerStyle={sharedStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.tituloBloco}>
          <Text style={[styles.titulo, { color: tema.texto, fontSize: tamanhoFonte * 1.4 }]}>
            Resultado
          </Text>
          <Text style={[styles.subtitulo, { color: tema.textoSecundario, fontSize: tamanhoFonte * 0.85 }]}>
            Operação: {operador || '—'}
          </Text>
        </View>

        <Configuracoes />

        <View style={[styles.resultadoCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          {erro ? (
            <Text style={[styles.erro, { color: '#ef4444', fontSize: tamanhoFonte }]}>{erro}</Text>
          ) : (
            <>
              <Text style={[styles.expressao, { color: tema.textoSecundario, fontSize: tamanhoFonte }]}>
                {expressao || '—'}
              </Text>
              <Text style={[styles.igual, { color: tema.textoSecundario, fontSize: tamanhoFonte * 0.9 }]}>
                =
              </Text>
              <Text style={[styles.resultado, { color: tema.destaque, fontSize: tamanhoFonte * 1.8 }]}>
                {resultado || '—'}
              </Text>
            </>
          )}
        </View>

        <BotaoPrimario onPress={() => navigation.goBack()}>Voltar</BotaoPrimario>

        <View style={styles.links}>
          {[
            { rota: 'Soma', label: 'Soma' },
            { rota: 'Multiplicacao', label: 'Multiplicação' },
            { rota: 'Divisao', label: 'Divisão' },
            { rota: 'Subtracao', label: 'Subtração' },
          ].map((item) => (
            <TouchableOpacity
              key={item.rota}
              onPress={() => navigation.navigate(item.rota)}
              style={[styles.linkBtn, { borderColor: tema.borda }]}
            >
              <Text style={[styles.linkTexto, { color: tema.destaque, fontSize: tamanhoFonte * 0.8 }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  tituloBloco: { alignItems: 'center', marginBottom: 4 },
  titulo: { fontWeight: '800', textAlign: 'center' },
  subtitulo: { fontWeight: '500', marginTop: 4, textAlign: 'center' },
  resultadoCard: {
    alignItems: 'center',
    borderRadius: RAIO.lg,
    borderWidth: 1,
    minHeight: 160,
    justifyContent: 'center',
    padding: 24,
  },
  expressao: { fontWeight: '600', textAlign: 'center' },
  igual: { fontWeight: '700', marginVertical: 8 },
  resultado: { fontWeight: '900', textAlign: 'center' },
  erro: { fontWeight: '700', textAlign: 'center' },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 8,
  },
  linkBtn: {
    borderRadius: RAIO.sm,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  linkTexto: { fontWeight: '700' },
});
