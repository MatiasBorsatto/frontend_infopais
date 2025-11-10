import axios from "axios";

export interface Noticia {
  id?: number;
  titulo: string;
  subtitulo: string;
  contenido: string;
  likes: number;
  dislikes: number;
  vistas: number;
  multimedia: string; // URL de imagen o video
}

const API_URL = "http://localhost:3000/api";

class NoticiaService {
  async obtenerNoticias(): Promise<Noticia[]> {
    const { data } = await axios.get(`${API_URL}/obtener`);
    return data.obtenerNoticias;
  }
}

export default new NoticiaService();
