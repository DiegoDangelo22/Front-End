import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/services/image.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TokenService } from 'src/app/services/token.service';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { InterceptorService } from 'src/app/services/interceptor-service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit, AfterViewChecked {
  proyectos: Proyectos[] = [];
  proyecto: string = '';
  descripcion: string = '';
  img: string = '';
  constructor(private proyectosService:ProyectosService, public imgServ:ImageService, private tokenService:TokenService, private interceptServ: InterceptorService) {}
  isLogged = false;
  isAdmin = false;
  ngOnInit(): void {
    this.cargarProyectos();
    if(this.tokenService.getUserName() === "test"){
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  ngAfterViewChecked(): void {
    try {
      if(this.proyectos.length > 0){
        let proyectosbtn = document.querySelectorAll("#botones-proyecto");
        proyectosbtn.forEach((e:any)=>e.style.display = 'block') ;
      }
      if(this.tokenService.getUserName() === "test") {
        let proyectosbtn:any = document.querySelectorAll("#botones-proyecto");
        proyectosbtn.forEach((e:any)=>e.style.display = 'none') ;
        let proyectosh1:HTMLElement = document.querySelector("#proyectos-h1");
        proyectosh1.style.fontSize = "40px";
      }
    } catch (error) {}
  }

  mostrarProyectos(proyectos: Proyectos): boolean {
    return proyectos.usuario.id === this.interceptServ.getUserId();
  }

  cargarProyectos():void{
    this.proyectosService.lista().subscribe(data => {this.proyectos = data});
  }

  delete(id?: number){
    if(id != undefined){
      this.proyectosService.delete(id).subscribe(data => {
        this.cargarProyectos();
      }, err => {
        alert("No se pudo borrar el proyecto");
      })
    }
    const storage = getStorage();
    const nombre = "proyecto_"+id;
    const Ref = ref(storage, 'img/' + nombre);
    deleteObject(Ref).then(() => {
      // alert("File deleted successfully");
    }).catch((error) => {
      // alert("Uh-oh, an error occurred!");
    });
  }
}