import { Usuario } from "./usuario";

export class Proyectos {
    id: number;
    proyecto: string;
    descripcion: string;
    img: string;
    usuario: Usuario;
    usuarioId: number;

    constructor(proyecto: string, descripcion: string, img: string, usuarioId: number){
        this.proyecto = proyecto;
        this.descripcion = descripcion;
        this.img = img;
        this.usuarioId = usuarioId;
    }
}
