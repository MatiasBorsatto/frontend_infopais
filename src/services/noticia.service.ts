import axios from "axios";
import type {Noticia} from '../types.ts'


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

//const API_URL = "http://192.168.1.16:3000/api";    En produccion

class NoticiaService {
  async obtenerNoticias(): Promise<Noticia[]> {
    const { data } = await axios.get(`${API_URL}/obtener`);
    return data.obtenerNoticias;
  }

  async obtenerNoticiasByCat(id: number): Promise<Noticia[]> {
    const { data } = await axios.get(`${API_URL}/obtenerByCat/${id}`);
    return data.obtenerNoticiasByCat;
  }

  async obtenerNoticiaPorSlug(slug: string): Promise<Noticia> {
    const { data } = await axios.get(`${API_URL}/obtenerSlug/${slug}`);
    return data.noticia;
  }

  async guardarNoticia(noticia: any): Promise<Noticia[]> {
    const { data } = await axios.post(`${API_URL}/guardar`, noticia);
    return data;
  }

  async eliminarNoticia(id: number): Promise<Noticia> {
    const { data } = await axios.delete(`${API_URL}/eliminar/${id}`);
    return data;
  }

  async actualizarNoticia(id_noticia: number, payload: any): Promise<Noticia[]> {
    const { data } = await axios.put(`${API_URL}/actualizar/${id_noticia}`, payload);
    return data;
  }

  async obtenerCategorias(){
    const { data } = await axios.get(`${API_URL}/obtenerCat`);
    return data.obtenerCategorias;
  }

  async obtenerSubcategorias(){
    const { data } = await axios.get(`${API_URL}/obtenerSubCat`);
    return data;
  }

}

export default new NoticiaService();
