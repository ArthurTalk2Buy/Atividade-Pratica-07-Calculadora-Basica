import React from 'react';
import { TelaOperacao } from '../shared/appShared';

export default function Tela4({ navigation }) {
  return (
    <TelaOperacao
      titulo="Subtração"
      operador="−"
      simboloCalc="−"
      telaAtual={4}
      navigation={navigation}
    />
  );
}
