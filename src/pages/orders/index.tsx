import React, { useEffect, useState } from "react";
import { listOrders } from "../../services/orderService";
import CloseOrder from "../close-order";
import "./style.css";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Order {
  id?: string;
  size: number;
  fruit: number;
  toppings: string[];
  prevision: number;
}

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await listOrders();
        setOrders(fetchedOrders);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="content-orders">
      <div>
        <div style={{display: "flex", alignItems:"center"}}>
          <Button onClick={() => navigate("/")}><ArrowBack /></Button>
          <h1>Meus pedidos</h1>
        </div>
        <h2>Pedidos ativos</h2>
          {orders?.map(o => (
            <CloseOrder
              key={o.id}
              sizeValue={o.size}
              fruitValue={o.fruit}
              toppings={o.toppings}
              prevision={o.prevision}
              id={o?.id}
            />
          ))}
          {orders.length === 0 && <p>Nenhum pedido encontrado.</p>}
      </div>
    </div>
  );
};

export default Orders;
