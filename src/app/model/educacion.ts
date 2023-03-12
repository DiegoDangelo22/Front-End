import { Usuario } from "./usuario";

export class Educacion {
    id: number;
    nombreEdu: string;
    descripcionEdu: string;
    usuario: Usuario;
    usuarioId: number;

    constructor(nombreEdu: string, descripcionEdu: string, usuarioId: number){
        this.nombreEdu = nombreEdu;
        this.descripcionEdu = descripcionEdu;
        this.usuarioId = usuarioId;
    }
}
