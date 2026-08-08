import { createContext, useContext, useState, useEffect } from "react";

const NotebookContext = createContext();

export function NotebookProvider({ children }) {
  const [notebooks, setNotebooks] = useState(() => {
    const saved = localStorage.getItem("notebooks");

    if (saved) {
      return JSON.parse(saved);
    }

    return [];
  });

  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("notebooks", JSON.stringify(notebooks));
  }, [notebooks]);

  function addNotebook(name, emoji) {
    const newNotebook = {
      id: Date.now(),
      name,
      emoji,
    };
    setNotebooks((prev) => [...prev, newNotebook]);
    return newNotebook;
  }

  function deleteNotebook(id) {
    setNotebooks((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <NotebookContext.Provider
      value={{
        notebooks,
        setNotebooks,
        addNotebook,
        deleteNotebook,
        isAddOpen,
        setIsAddOpen,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
}

export function useNotebook() {
  return useContext(NotebookContext);
}