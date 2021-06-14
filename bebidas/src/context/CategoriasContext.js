// Context hook es para la comunicacion directa entre componentes de padre a hijo
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el context
export const CategoriasContext = createContext();

// Cada context necesita un Provider
// Provider es donde se encuentran las funciones y los states (lo que queremos pasar al componente)
const CategoriasProvider = (props) => {
  // Crear el state del context
  const [categorias, guardarCategorias] = useState([]);

  // Ejecutar el llamado a la API para obtener las categorias
  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
      const categorias = await axios.get(url);
      guardarCategorias(categorias.data.drinks);
    };
    obtenerCategorias();
  }, []);

  return (
    <CategoriasContext.Provider value={{ categorias }}>
      {props.children}
    </CategoriasContext.Provider>
  );
};
export default CategoriasProvider;
