import { defineStore } from "pinia";
import noticiaService from "../services/noticia.service.ts";

export const useNoticiaStore = defineStore("Noticias", () => {
  // Acciones
  const obtenerNoticias = async () => {
    try {
      const data = await noticiaService.obtenerNoticias();
      return data;
    } catch (error) {
      console.error("Error al obtener noticias:", error);
      throw error;
    }
  };

  const obtenerCategorias = async () => {
    try {
      const data = await noticiaService.obtenerCategorias();
      return data;
    } catch (error) {
      console.error("Error al obtener categorias:", error);
      throw error;
    }
  };

  const obtenerSubcategorias = async () => {
    try {
      const data = await noticiaService.obtenerSubcategorias();
      return data;
    } catch (error) {
      console.error("Error al obtener subcategorias:", error);
      throw error;
    }
  };

  // Exponer estado y acciones (sin ejecutar)
  return {
    // Acciones
    obtenerNoticias,
    obtenerCategorias,
    obtenerSubcategorias,
  };
});
