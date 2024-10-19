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
  id: string;
  message: string;
  prevision: number;
}

export const createOrder = async (order: Order): Promise<OrderResponse> => {
  try {
    const response = await api.post<OrderResponse>("order", order);
    return response.data;
  } catch (error) {
    console.error("Erro para criar pedido", error);
    throw error;
  }
};

export const listOrders = async (): Promise<Order[]> => {
    try {
      const response = await api.get<Order[]>("/order");
      return response.data;
    } catch (error) {
      console.error("Erro para carregar pedidos", error);
      throw error;
    }
  };
