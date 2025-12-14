interface Noticia {
  id_noticia?: number;
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
  slug: string;
}

interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  fecha_nac?: string;
  rol_id?: number;
}

export type { Noticia, Usuario as default };