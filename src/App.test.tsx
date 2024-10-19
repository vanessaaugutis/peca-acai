import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Order from "./pages/order";
import { createOrder } from "./services/orderService";
import store from "./store";

jest.mock("./services/orderService", () => ({
  createOrder: jest.fn(),
}));

describe("Componente de pedido", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deve criar um pedido com sucesso", async () => {
    (createOrder as jest.Mock).mockResolvedValue({
      orderId: 123,
      message: "Pedido criado com sucesso",
      estimatedTime: 15,
    });

    render(
      <Provider store={store}>
        <Order />
      </Provider>
    );

    const sizeOption = screen.getByLabelText(/Médio - 500ml R\$20/i);
    fireEvent.click(sizeOption);
    fireEvent.click(screen.getByText(/Próximo/i));

    const fruitOption = screen.getByLabelText(/Morango/i);
    fireEvent.click(fruitOption);
    fireEvent.click(screen.getByText(/Próximo/i));

    const toppingOption = screen.getByLabelText(/Granola/i);
    fireEvent.click(toppingOption);
    fireEvent.click(screen.getByText(/Fechar pedido/i));

    await waitFor(() => {
      expect(createOrder).toHaveBeenCalledWith({
        size: 20,
        fruit: 4,
        toppings: ["granola"],
        total: 20 + 4 + 3,
        prevision: 7,
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/Pedido confirmado!/i)).toBeInTheDocument();
    });
  });

  test("Deve dar mensagem de erro ao criar pedido", async () => {
    (createOrder as jest.Mock).mockRejectedValue(new Error("Erro ao criar pedido"));

    render(
      <Provider store={store}>
        <Order />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText(/Médio - 500ml R\$20/i));
    fireEvent.click(screen.getByText(/Próximo/i));
    fireEvent.click(screen.getByLabelText(/Morango/i));
    fireEvent.click(screen.getByText(/Próximo/i));
    fireEvent.click(screen.getByLabelText(/Granola/i));
    fireEvent.click(screen.getByText(/Fechar pedido/i));

    await waitFor(() => {
      expect(screen.getByText(/Erro ao realizar o pedido/i)).toBeInTheDocument();
    });
  });
});
