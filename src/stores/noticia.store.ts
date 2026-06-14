import { defineStore } from "pinia";
import noticiaService from "../services/noticia.service.ts";



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

    const obtenerNoticiasByCat = async (id: number) => {
      try {
        const data = await noticiaService.obtenerNoticiasByCat(id);
        return data;
      } catch (error) {
        console.error("Error al obtener noticias:", error);
        throw error;
      }
    };

    const obtenerNoticiaPorSlug = async (slug: string) => {
      try {
        const data = await noticiaService.obtenerNoticiaPorSlug(slug);
        return data;
      } catch (error) {
        console.error("Error al obtener noticia por slug:", error);
        throw error;
      }
    };

    const guardarNoticia = async (noticia: any) => {
      try {
        const data = await noticiaService.guardarNoticia(noticia);
        return data;
      } catch (error) {
        console.error("Error al obtener noticias:", error);
        throw error;
      }
    };

    const actualizarNoticia = async (id: number, payload: any) => {
      try {
        const data = await noticiaService.actualizarNoticia(id, payload);
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
      obtenerNoticiasByCat,
      obtenerNoticiaPorSlug
    };
  },
  {
    persist: true,
  }
);
