import { Usuario } from "./usuario";

export class Experiencia {
    id? : number;
    nombreExp : string;
    descripcionExp : string;
    usuario: Usuario;
    usuarioId: number;

    constructor(nombreExp:string, descripcionExp:string, usuarioId:number) {
        this.nombreExp = nombreExp;
        this.descripcionExp = descripcionExp
        this.usuarioId = usuarioId;
    }
}
