import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./style"

const Home: React.FC = () => {
  const navigate = useNavigate();
  const navigateOrder = () => {
    navigate("/order");
  }
  return (
    <div id="content">
      <Button onClick={navigateOrder}>Criar pedido</Button>
    </div>
  );
};

export default Home;
