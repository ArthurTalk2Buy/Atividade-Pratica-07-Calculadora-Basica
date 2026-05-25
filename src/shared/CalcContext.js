import React, { createContext, useContext, useMemo, useState } from 'react';

const CalcContext = createContext(null);

export function CalcProvider({ children }) {
  const [temaEscuro, setTemaEscuro] = useState(true);
  const [tamanhoFonte, setTamanhoFonte] = useState(18);
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [operador, setOperador] = useState('+');
  const [expressao, setExpressao] = useState('');
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  const valor = useMemo(
    () => ({
      temaEscuro,
      setTemaEscuro,
      tamanhoFonte,
      setTamanhoFonte,
      numero1,
      setNumero1,
      numero2,
      setNumero2,
      operador,
      setOperador,
      expressao,
      setExpressao,
      resultado,
      setResultado,
      erro,
      setErro,
    }),
    [temaEscuro, tamanhoFonte, numero1, numero2, operador, expressao, resultado, erro],
  );

  return <CalcContext.Provider value={valor}>{children}</CalcContext.Provider>;
}

export function useCalc() {
  const ctx = useContext(CalcContext);
  if (!ctx) {
    throw new Error('useCalc deve ser usado dentro de CalcProvider');
  }
  return ctx;
}
