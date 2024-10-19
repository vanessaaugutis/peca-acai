import api from "./api";

interface Order {
  id?: string
  size: number;
  fruit: number;
  toppings: string[];
  total: number;
  prevision: number;
}

interface OrderResponse {
  orderId: number;
  message: string;
  estimatedTime: number;
}

export const createOrder = async (order: Order): Promise<OrderResponse> => {
  const arrayOrder = [];
  arrayOrder.push(order);
  try {
    const response = await api.post<OrderResponse>("/orders", arrayOrder);
    return response.data;
  } catch (error) {
    console.error("Erro para criar pedido", error);
    throw error;
  }
};

export const listOrders = async (): Promise<Order[]> => {
    try {
      const response = await api.get<Order[]>("/orders");
      return response.data;
    } catch (error) {
      console.error("Erro para carregar pedidos", error);
      throw error;
    }
  };
