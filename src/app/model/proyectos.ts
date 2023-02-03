export class Proyectos {
    id: number;
    proyecto: string;
    descripcion: string;
    img: string;

    constructor(proyecto: string, descripcion: string, img: string){
        this.proyecto = proyecto;
        this.descripcion = descripcion;
        this.img = img;
    }
}
