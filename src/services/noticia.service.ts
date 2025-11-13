import axios from "axios";

export interface Noticia {
  id?: number;
  titulo: string;
  subtitulo: string;
  contenido: string;
  likes?: number;
  by: string;
  dislikes?: number;
  id_categoria?: number;
  id_subcategoria?: number;
  vistas?: number;
  multimedia: string; // URL de imagen o video
}

const API_URL = "http://localhost:3000/api";

class NoticiaService {
  async obtenerNoticias(): Promise<Noticia[]> {
    const { data } = await axios.get(`${API_URL}/obtener`);
    return data.obtenerNoticias;
  }

  async guardarNoticia(noticia: Noticia): Promise<Noticia[]> {
    const { data } = await axios.post(`${API_URL}/guardar`, noticia);
    return data;
  }

  async obtenerCategorias(){
    const { data } = await axios.get(`${API_URL}/obtenerCat`);
    return data;
  }

  async obtenerSubcategorias(){
    const { data } = await axios.get(`${API_URL}/obtenerSubCat`);
    return data;
  }

}

export default new NoticiaService();
