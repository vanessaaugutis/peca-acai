import React from "react";
import "./style.css"; 

interface CloseOrderProps {
  sizeValue: number | null;
  fruitValue: number | null;
  toppings: string[];
  prevision: number | 0;
  id?: string | undefined
}

const CloseOrder: React.FC<CloseOrderProps> = ({ sizeValue, fruitValue, toppings, prevision, id }) => {
  const sizeNames: { [key: number]: string } = {
    18: "Pequeno - 300ml",
    20: "Médio - 500ml",
    22: "Grande - 700ml",
  };

  const fruitNames: { [key: number]: string } = {
    0: "Banana",
    2: "Kiwi",
    4: "Morango",
  };

  const toppingValues: { [key: string]: number } = {
    granola: 3,
    pacoca: 5,
    "leite-ninho": 4,
  };

  const toppingNames: { [key: string]: string } = {
    granola: "Granola",
    pacoca: "Paçoca",
    "leite-ninho": "Leite Ninho",
  };

  const totalToppingsPrice = toppings.reduce((total, topping) => total + toppingValues[topping], 0);
  const total = (sizeValue || 0) + (fruitValue || 0) + totalToppingsPrice;

  return (
    <div className="content-details">
      <div className="close-content">
        <div className="details">
          <div>
            <img 
              style={{borderRadius: "8px"}} 
              width="150px" 
              alt="Imagem de açaí"
              src="https://th.bing.com/th/id/R.d2db326f6c0983424422b5a65e24852b?rik=8UdmbnRFw%2bkNyg&pid=ImgRaw&r=0"
            />
          </div>
          <div style={{margin: "0px 15px"}}>
            <p>1 item</p>
            <h3>Açai Natural</h3>
            <p>- {sizeValue ? sizeNames[sizeValue] : "Nenhum selecionado"}</p>
            <p>- {fruitValue ? fruitNames[fruitValue] : "Nenhuma selecionada"}</p>
            <p>- {toppings.length > 0 ? toppings.map(t => toppingNames[t]).join(", ") : "Nenhum selecionado"}</p>
          </div>
          {id &&
            <div className="number-order">
              <p>#{id}</p>
            </div>
          }
          
        </div>
        <div className="conclusion">
          <div>
            <p>Previsão de entrega</p>
            <h4>{prevision} minutos</h4>
          </div>
          <div>
            <p>Valor total</p>
            <h4>R${total.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloseOrder;
