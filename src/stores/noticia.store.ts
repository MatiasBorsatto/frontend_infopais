import { defineStore } from "pinia";
import noticiaService from "../services/noticia.service.ts";
import type { Noticia } from "../types.ts";


export const useNoticiaStore = defineStore(
  "Noticias",
  () => {
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

    const guardarNoticia = async (noticia: Noticia) => {
      try {
        const data = await noticiaService.guardarNoticia(noticia);
        return data;
      } catch (error) {
        console.error("Error al obtener noticias:", error);
        throw error;
      }
    };

    const actualizarNoticia = async (noticia: Noticia) => {
      try {
        const { id_noticia, ...noticiaCont } = noticia;
        const data = await noticiaService.actualizarNoticia(
          id_noticia as number,
          noticiaCont
        );
        return data;
      } catch (error) {
        console.error("Error al actualizar noticia:", error);
        throw error;
      }
    };

    const eliminarNoticia = async (id: number) => {
      try {
        const data = await noticiaService.eliminarNoticia(id);
        return data;
      } catch (error) {
        console.error("Error al eliminar noticia:", error);
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
      guardarNoticia,
      actualizarNoticia,
      eliminarNoticia,
    };
  },
  {
    persist: true,
  }
);
