import React from 'react';

interface CloseOrderProps {
  sizeValue: number | null;
  fruitValue: number | null;
  toppings: string[];
}

const CloseOrder: React.FC<CloseOrderProps> = ({ sizeValue, fruitValue, toppings }) => {
  const sizeNames: { [key: number]: string } = {
    18: 'Pequeno - 300ml',
    20: 'Médio - 500ml',
    22: 'Grande - 700ml',
  };

  const fruitNames: { [key: number]: string } = {
    0: 'Banana',
    2: 'Kiwi',
    4: 'Morango',
  };

  const toppingNames: { [key: string]: number } = {
    granola: 3,
    pacoca: 5,
    'leite-ninho': 4,
  };

  const totalToppingsPrice = toppings.reduce((total, topping) => total + toppingNames[topping], 0);
  const total = (sizeValue || 0) + (fruitValue || 0) + totalToppingsPrice;

  return (
    <div>
      <h1>Resumo do Pedido</h1>
      <h2>Tamanho: {sizeValue ? sizeNames[sizeValue] : 'Nenhum selecionado'}</h2>
      <h2>Fruta: {fruitValue ? fruitNames[fruitValue] : 'Nenhuma selecionada'}</h2>
      <h2>Complementos: {toppings.length > 0 ? toppings.join(', ') : 'Nenhum selecionado'}</h2>
      <h2>Total: R${total.toFixed(2)}</h2>
    </div>
  );
};

export default CloseOrder;
