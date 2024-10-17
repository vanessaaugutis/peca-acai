import React, { useState } from 'react';
import './style.css';
import CloseOrder from '../close-order';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';

const Order: React.FC = () => {
  const [step, setStep] = useState(1);
  const [sizeValue, setSizeValue] = useState<number | null>(null);
  const [fruitValue, setFruitValue] = useState<number | null>(null);
  const [toppings, setToppings] = useState<string[]>([]);
  const [prevision, setPrevision] = useState(0);

  const handleToppingChange = (topping: string) => {
    setToppings((prevToppings) =>
      prevToppings.includes(topping)
        ? prevToppings.filter((t) => t !== topping)
        : [...prevToppings, topping]
    );
  };

  const toppingNames: { [key: string]: number } = {
    granola: 3,
    pacoca: 5,
    'leite-ninho': 4,
  };

  const totalToppingsPrice = toppings.reduce((total, topping) => total + toppingNames[topping], 0);
  const total = (sizeValue || 0) + (fruitValue || 0) + totalToppingsPrice;

  return (
    <div id="content">
      {step !== 4 && (
        <>
          <div className="image-content">
            {step > 1 && <button onClick={() => setStep(step - 1)}>Voltar</button>}
          </div>
          <div className="content-informations">
            <h1>Açaí Natural</h1>
            <p>Super Copo de 500 ml de Açaí Tradicional - Atenção: Contém somente açaí puro! Ideal para quem gosta de aproveitar um açaí puro ou rechear do seu jeito! Obs: não trocamos nem adicionamos itens a esse copo!</p>

            {step === 1 && (
              <FormControl component="fieldset">
                <FormLabel component="legend">Escolha o tamanho</FormLabel>
                <RadioGroup
                  value={sizeValue}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    setSizeValue(value);
                    setPrevision(value === 18 ? 5 : value === 20 ? 7 : 9);
                  }}
                >
                  <FormControlLabel value={18} control={<Radio />} label="Pequeno - 300ml R$18" />
                  <FormControlLabel value={20} control={<Radio />} label="Médio - 500ml R$20" />
                  <FormControlLabel value={22} control={<Radio />} label="Grande - 700ml R$22" />
                </RadioGroup>
              </FormControl>
            )}

            {step === 2 && (
              <FormControl component="fieldset">
                <FormLabel component="legend">Escolha uma fruta</FormLabel>
                <RadioGroup
                  value={fruitValue}
                  onChange={(e) => setFruitValue(parseInt(e.target.value, 10))}
                >
                  <FormControlLabel value={0} control={<Radio />} label="Banana + R$0" />
                  <FormControlLabel value={4} control={<Radio />} label="Morango + R$4" />
                  <FormControlLabel value={2} control={<Radio />} label="Kiwi + R$2" />
                </RadioGroup>
              </FormControl>
            )}

            {step === 3 && (
              <div>
                <h3>Escolha complementos</h3>
                <p>Escolha até 3 opções</p>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={toppings.includes('granola')}
                      onChange={() => handleToppingChange('granola')}
                    />
                  }
                  label="Granola + R$3"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={toppings.includes('pacoca')}
                      onChange={() => handleToppingChange('pacoca')}
                    />
                  }
                  label="Paçoca + R$5"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={toppings.includes('leite-ninho')}
                      onChange={() => handleToppingChange('leite-ninho')}
                    />
                  }
                  label="Leite Ninho + R$4"
                />
              </div>
            )}

            <div className="buttons-order">
              <h2>Total: R${total.toFixed(2)}</h2>
              {step < 3 && <button onClick={() => setStep(step + 1)}>Próximo</button>}
              {step === 3 && <button onClick={() => setStep(4)}>Fechar pedido</button>}
            </div>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <CloseOrder sizeValue={sizeValue} fruitValue={fruitValue} toppings={toppings} prevision={prevision} />
          <button onClick={() => setStep(step - 1)}>Voltar</button>
          <button onClick={() => alert('pedido efetuado com sucesso!')}>Fechar pedido</button>
        </>
      )}
    </div>
  );
};

export default Order;
