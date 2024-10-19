import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Content } from "./style"

const Home: React.FC = () => {
  const navigate = useNavigate();
  const navigateOrder = () => {
    navigate("/order");
  }
  const navigateOrders = () => {
    navigate("/orders");
  }
  return (
    <Content>
      <h1>Bem-vindo! Peça seu açaí e fique atualizado com seu pedido.</h1>
      <Button onClick={navigateOrder}>Criar pedido</Button>
      <Button onClick={navigateOrders}>Ver pedidos</Button>
    </Content>
  );
};

export default Home;
