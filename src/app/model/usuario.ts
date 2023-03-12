import { Educacion } from "./educacion";

export class Usuario {
  id: number;
  nombreUsuario: string;
  password: string;
  educacion: Educacion[];

  constructor(id: number, nombreUsuario: string, password: string, educacion: Educacion[]){
    this.id = id;
    this.nombreUsuario = nombreUsuario;
    this.password = password;
    this.educacion = educacion;
  }
}
