import React from 'react';
import { TelaOperacao } from '../shared/appShared';

export default function Tela2({ navigation }) {
  return (
    <TelaOperacao
      titulo="Multiplicação"
      operador="×"
      simboloCalc="×"
      telaAtual={2}
      navigation={navigation}
    />
  );
}
