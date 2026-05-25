import React from 'react';
import { TelaOperacao } from '../shared/appShared';

export default function Tela3({ navigation }) {
  return (
    <TelaOperacao
      titulo="Divisão"
      operador="÷"
      simboloCalc="÷"
      telaAtual={3}
      navigation={navigation}
    />
  );
}
