import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createOrder } from "../../services/orderService";
import { setSizeValue, setFruitValue, setToppings, setPrevision, setTotal, resetOrder } from "../../features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const orderSchema = z.object({
  size: z.number().min(1, { message: "Por favor, escolha um tamanho." }),
  fruit: z.number().min(0, { message: "Por favor, escolha uma fruta." }),
});

type Topping = "granola" | "pacoca" | "leite-ninho";

export interface OrderInterface {
  sizeValue: number | null;
  fruitValue: number | null;
  toppings: string[];
  prevision: number;
  total: number;
}

export interface OrderState {
  order: OrderInterface
}

const useOrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sizeValue, fruitValue, toppings, prevision, total } = useSelector((state: OrderState) => state.order);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(orderSchema)
  });

  const [step, setStep] = useState(1);

  const isNextButtonDisabled = () => {
    if (step === 1 && !sizeValue) {
      toast.error("Você precisa selecionar um tamanho!");
      return true;
    }
    if (step === 2 && !fruitValue) {
      toast.error("Você precisa selecionar uma fruta!");
      return true;
    }
    return false;
  };

  const calculateTotal = () => {
    const toppingPrices: Record<Topping, number> = {
      granola: 3,
      pacoca: 5,
      "leite-ninho": 4,
    };

    return (sizeValue || 0) + (fruitValue || 0) + toppings.reduce((sum: number, topping: string) => sum + (toppingPrices[topping as Topping] || 0), 0);
  };

  const onSubmit = async () => {
    const order = {
      size: sizeValue || 0,
      fruit: fruitValue || 0,
      toppings,
      total,
      prevision,
    };

    try {
      const response = await createOrder(order);
      toast.success(`Pedido confirmado! Nº do pedido: ${response.orderId}. Tempo estimado: ${response.estimatedTime} minutos.`);
      dispatch(resetOrder());
    } catch (error) {
      toast.error("Erro ao realizar o pedido. Tente novamente.");
    }
  };

  return {
    sizeValue,
    fruitValue,
    toppings,
    prevision,
    total,
    setFruitValue: (value: number) => dispatch(setFruitValue(value)),
    setSizeValue: (value: number) => dispatch(setSizeValue(value)),
    setPrevision: (value: number) => dispatch(setPrevision(value)),
    setToppings: (value: Array<string>) => dispatch(setToppings(value)),
    setTotal: (value: number) => dispatch(setTotal(value)),
    navigate,
    control,
    handleSubmit,
    step,
    setStep,
    isNextButtonDisabled,
    calculateTotal,
    onSubmit
  };
};

export default useOrderForm;
