export class Educacion {
    id: number;
    nombreEdu: string;
    descripcionEdu: string;
    usuarioId: number;

    constructor(nombreEdu: string, descripcionEdu: string, usuarioId: number){
        this.nombreEdu = nombreEdu;
        this.descripcionEdu = descripcionEdu;
        this.usuarioId = usuarioId;
    }
}
