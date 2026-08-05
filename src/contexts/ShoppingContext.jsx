import { createContext, useContext, useState, useEffect } from "react";

const ShoppingContext = createContext();

export function ShoppingProvider({ children }) {
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem("shoppingList");

    if (savedList) {
      return JSON.parse(savedList);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(list));
  }, [list]);

  return (
    <ShoppingContext.Provider value={{ list, setList }}>
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShopping() {
  return useContext(ShoppingContext);
}
