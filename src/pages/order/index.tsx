import React, { useState } from 'react';
import './style.css'; 
import CloseOrder from '../close-order';

const Order: React.FC = () => {
  const [step, setStep] = useState(1);
  const [sizeValue, setSizeValue] = useState<number | null>(null);
  const [fruitValue, setFruitValue] = useState<number | null>(null);
  const [toppings, setToppings] = useState<string[]>([]);

  const handleToppingChange = (topping: string) => {
    setToppings(prevToppings => 
      prevToppings.includes(topping)
        ? prevToppings.filter(t => t !== topping)
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
            {step < 3 && <button onClick={() => setStep(step + 1)}>Próximo</button>}
            {step === 3 && <button onClick={() => setStep(4)}>Fechar pedido</button>}
          </div>
          <div className="content-informations">
            <h1>Açaí Natural</h1>
            <p>Super Copo de 500 ml de Açaí Tradicional - Atenção: Contém somente açaí puro! Ideal para quem gosta de aproveitar um açaí puro ou rechear do seu jeito! Obs: não trocamos nem adicionamos itens a esse copo!</p>

            {step === 1 && (
              <div>
                <h3>Escolha o tamanho</h3>
                <p>Escolha pelo menos 1 opção</p>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="18"
                      checked={sizeValue === 18}
                      onChange={() => setSizeValue(18)}
                    />
                    Pequeno - 300ml <span>R$18</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="20"
                      checked={sizeValue === 20}
                      onChange={() => setSizeValue(20)}
                    />
                    Médio - 500ml <span>R$20</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="22"
                      checked={sizeValue === 22}
                      onChange={() => setSizeValue(22)}
                    />
                    Grande - 700ml <span>R$22</span>
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3>Escolha uma fruta</h3>
                <p>Escolha pelo menos 1 opção</p>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="0"
                      checked={fruitValue === 0}
                      onChange={() => setFruitValue(0)}
                    />
                    Banana <span>+ R$0</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="4"
                      checked={fruitValue === 4}
                      onChange={() => setFruitValue(4)}
                    />
                    Morango <span>+ R$4</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="2"
                      checked={fruitValue === 2}
                      onChange={() => setFruitValue(2)}
                    />
                    Kiwi <span>+ R$2</span>
                  </label>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3>Escolha complementos</h3>
                <p>Escolha até 3 opções</p>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={toppings.includes('granola')}
                      onChange={() => handleToppingChange('granola')}
                    />
                    Granola <span>+ R$3</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={toppings.includes('pacoca')}
                      onChange={() => handleToppingChange('pacoca')}
                    />
                    Paçoca <span>+ R$5</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={toppings.includes('leite-ninho')}
                      onChange={() => handleToppingChange('leite-ninho')}
                    />
                    Leite Ninho <span>+ R$4</span>
                  </label>
                </div>
              </div>
            )}
            <h2>Total: R${total.toFixed(2)}</h2>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <CloseOrder sizeValue={sizeValue} fruitValue={fruitValue} toppings={toppings}/>
          <button onClick={() => setStep(step - 1)}>Voltar</button>
          <button onClick={() => alert('pedido efetuado com sucesso!')}>Fechar pedido</button>
        </>
      )}
      
    </div>
  );
};

export default Order;
