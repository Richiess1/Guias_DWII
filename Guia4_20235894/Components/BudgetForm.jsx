import { useContext, useState } from "react";
import { BudgetDispatchContext } from "../src/context/BudgetContext";

export const BudgetForm = () => {
  const [budget, setBudget] = useState(""); // Estado inicial vacío
  const isInvalid = budget === "" || budget <= 0; // Verifica valores vacíos o negativos

  const handleChange = (e) => {
    const value = e.target.valueAsNumber;
    setBudget(isNaN(value) ? "" : value); // Evita NaN cuando el input está vacío
  };

  const dispatch = useContext(BudgetDispatchContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "add-budget",
      payload: { budget },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
          Definir presupuesto
        </label>
      </div>
      <input
        type="number"
        id="budget"
        name="budget"
        placeholder="Define tu presupuesto"
        className="w-full bg-white border border-gray-200 p-2"
        value={budget}
        onChange={handleChange}
      />
      <input
        type="submit"
        value="Definir presupuesto"
        disabled={isInvalid}
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
      />
    </form>
  );
};
