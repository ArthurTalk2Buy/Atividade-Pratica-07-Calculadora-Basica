export const OPERACOES = {
  SOMA: { simbolo: '+', rotulo: 'Soma' },
  MULTIPLICACAO: { simbolo: '×', rotulo: 'Multiplicação' },
  DIVISAO: { simbolo: '÷', rotulo: 'Divisão' },
  SUBTRACAO: { simbolo: '−', rotulo: 'Subtração' },
};

export function calcular(operador, numero1, numero2) {
  const a = parseFloat(String(numero1).replace(',', '.'));
  const b = parseFloat(String(numero2).replace(',', '.'));

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return { erro: 'Informe números válidos nos dois campos.' };
  }

  let resultado;
  switch (operador) {
    case '+':
      resultado = a + b;
      break;
    case '×':
      resultado = a * b;
      break;
    case '÷':
      if (b === 0) {
        return { erro: 'Não é possível dividir por zero.' };
      }
      resultado = a / b;
      break;
    case '−':
      resultado = a - b;
      break;
    default:
      return { erro: 'Operação inválida.' };
  }

  const expressao = `${formatarNumero(a)} ${operador} ${formatarNumero(b)}`;
  return {
    expressao,
    resultado: formatarNumero(resultado),
  };
}

function formatarNumero(valor) {
  const arredondado = Math.round(valor * 1e10) / 1e10;
  return String(arredondado);
}
