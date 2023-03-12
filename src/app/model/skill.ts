import { Usuario } from "./usuario";

export class Skill {
    id:number;
    name:string;
    percentage:number;
    usuario: Usuario;
    usuarioId: number;

    constructor(name:string, percentage:number, usuarioId:number){
        this.name = name;
        this.percentage = percentage;
        this.usuarioId = usuarioId;
    }
}