interface Noticia {
  id_noticia: number;
  titulo: string;
  subtitulo: string;
  contenido: string;
  likes?: number;
  by: string;
  dislikes?: number;
  id_categoria?: number;
  id_subcategoria?: number;
  vistas?: number;
  id_estado: number;
  multimedia: string; // URL de imagen o video
  slug: string;
}

interface Categoria{
  id: number;
  nombre: string;
}

interface Subcategoria{
  id: number;
  nombre: string;
}

interface Usuario {
  id:number
  nombre: string;
  email: string;
  password: string;
  fecha_nac?: string;
  rol_id?: number;
}

interface Cookie {
  name: string,
  value: any,
  expires: number,
  sameSite: CookieSameSite,
}

interface PropsBarraGeneral {
  categoria?: string;
}

type UsuarioCrear = Omit<Usuario, 'id'>


export type { PropsBarraGeneral, Cookie, UsuarioCrear, Subcategoria, Categoria, Noticia, Usuario };