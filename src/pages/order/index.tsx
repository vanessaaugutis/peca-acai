import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseOrder from "../close-order";
import "./style.css";
import useOrderForm from "./useOrderForm";
import { Controller } from "react-hook-form";

const Order: React.FC = () => {
  const {
    sizeValue,
    fruitValue,
    toppings,
    prevision,
    total,
    setFruitValue,
    setSizeValue,
    setPrevision,
    setToppings,
    setTotal,
    navigate,
    control,
    handleSubmit,
    step,
    setStep,
    isNextButtonDisabled,
    calculateTotal,
    onSubmit
  } = useOrderForm();

  return (
    <div id="content">
      <ToastContainer />
      {step !== 4 && (
        <>
          <div className="image-content">
            {step >= 1 && (
              <button onClick={() => (step !== 1 ? setStep(step - 1) : navigate("/"))}>
                <ArrowBackIcon />
              </button>
            )}
          </div>
          <div className="content-informations">
            <h1>Açaí Natural</h1>
            <p>Super Copo de 500 ml de Açaí Tradicional - Atenção: Contém somente açaí puro! Ideal para quem gosta de aproveitar um açaí puro ou rechear do seu jeito! Obs: não trocamos nem adicionamos itens a esse copo!</p>

            {step === 1 && (
              <FormControl component="fieldset">
                <FormLabel component="legend">Escolha o tamanho</FormLabel>
                <Controller
                  name="size"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setSizeValue(value);
                        setPrevision(value === 18 ? 5 : value === 20 ? 7 : 9); // Ajuste da previsão
                        const newTotal = calculateTotal();
                        setTotal(newTotal);
                        field.onChange(value);
                      }}
                    >
                      <FormControlLabel value={18} control={<Radio />} label="Pequeno - 300ml - R$18" />
                      <FormControlLabel value={20} control={<Radio />} label="Médio - 500ml - R$20" />
                      <FormControlLabel value={22} control={<Radio />} label="Grande - 700ml - R$22" />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            )}

            {step === 2 && (
              <FormControl component="fieldset">
                <FormLabel component="legend">Escolha uma fruta</FormLabel>
                <Controller
                  name="fruit"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setFruitValue(value);
                        const newTotal = calculateTotal();
                        setTotal(newTotal);
                        field.onChange(value);
                      }}
                    >
                      <FormControlLabel value={0} control={<Radio />} label="Banana + R$0" />
                      <FormControlLabel value={4} control={<Radio />} label="Morango + R$4" />
                      <FormControlLabel value={2} control={<Radio />} label="Kiwi + R$2" />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            )}

            {step === 3 && (
              <div>
                <h3>Escolha complementos</h3>
                <p>Escolha até 3 opções</p>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={toppings.includes("granola")}
                      onChange={() => {
                        const newToppings = toppings.includes("granola")
                          ? toppings.filter((t) => t !== "granola")
                          : [...toppings, "granola"];
                        setToppings(newToppings);
                        setTotal(calculateTotal());
                      }}
                    />
                  }
                  label="Granola + R$3"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={toppings.includes("pacoca")}
                      onChange={() => {
                        const newToppings = toppings.includes("pacoca")
                          ? toppings.filter((t) => t !== "pacoca")
                          : [...toppings, "pacoca"];
                        setToppings(newToppings);
                        setTotal(calculateTotal());
                      }}
                    />
                  }
                  label="Paçoca + R$5"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={toppings.includes("leite-ninho")}
                      onChange={() => {
                        const newToppings = toppings.includes("leite-ninho")
                          ? toppings.filter((t) => t !== "leite-ninho")
                          : [...toppings, "leite-ninho"];
                        setToppings(newToppings);
                        setTotal(calculateTotal());
                      }}
                    />
                  }
                  label="Leite Ninho + R$4"
                />
              </div>
            )}

            <div className="buttons-order">
              <h2>Total: R${total.toFixed(2)}</h2>
              {step < 3 && (
                <button onClick={() => {
                  if (!isNextButtonDisabled()) {
                    setStep(step + 1);
                  }
                }}>
                  Próximo
                </button>
              )}
              {step === 3 && <button onClick={() => setStep(4)}>Fechar pedido</button>}
            </div>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <CloseOrder sizeValue={sizeValue} fruitValue={fruitValue} toppings={toppings} prevision={prevision} />
          <div className="buttons-close">
            <button onClick={() => setStep(step - 1)}>Voltar</button>
            <button onClick={handleSubmit(onSubmit)}>Fechar pedido</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
