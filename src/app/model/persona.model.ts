export class Persona{
    id?: number;
    nombre: string;
    apellido: string;
    descripcion: string;
    profesion: string;
    img: string;

    constructor(nombre: string, apellido: string, descripcion: string, profesion: string, img: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.descripcion = descripcion;
        this.profesion = profesion;
        this.img = img;
    }
}