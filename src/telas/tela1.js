import React from 'react';
import { TelaOperacao } from '../shared/appShared';

export default function Tela1({ navigation }) {
  return (
    <TelaOperacao
      titulo="Soma"
      operador="+"
      simboloCalc="+"
      telaAtual={1}
      navigation={navigation}
    />
  );
}
