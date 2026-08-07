import { createContext, useContext, useState, useEffect } from "react";

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState(() => {
    const savedRecipe = localStorage.getItem("recipeInfo");

    if (savedRecipe) {
      return JSON.parse(savedRecipe);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("recipeInfo", JSON.stringify(recipeInfo));
  }, [recipeInfo]);
  return (
    <RecipeContext.Provider
      value={{
        isOpen,
        setIsOpen,
        recipeInfo,
        setRecipeInfo,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipe() {
  return useContext(RecipeContext);
}
