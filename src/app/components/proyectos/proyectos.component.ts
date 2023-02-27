import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { NewProyectoComponent } from './new-proyecto.component';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/services/image.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TokenService } from 'src/app/services/token.service';
import { getStorage, ref, deleteObject } from "firebase/storage";

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit, AfterViewChecked, OnDestroy {
  proyectos: Proyectos[] = [];
  proyecto: string = '';
  descripcion: string = '';
  img: string = '';

  constructor(private router:Router, private proyectosService:ProyectosService, public imgServ:ImageService, private tokenService:TokenService, private notif:AppComponent, private ActivatedRoute:ActivatedRoute, private newProyecto:NewProyectoComponent)
   {

   }

  isLogged = false;
  isAdmin = false;
  ngOnInit(): void {
    this.cargarProyectos();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    if((this.tokenService.getAuthorities()[0] && this.tokenService.getAuthorities()[1])){
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  ngAfterViewChecked(): void {
    if(this.isAdmin == false && this.proyectos.length > 0){
      console.clear()
      let proyectosbtn:HTMLElement = document.getElementById("botones-proyecto");
      let proyectosh1:HTMLElement = document.querySelector("#proyectos-h1");
      proyectosbtn.style.display = 'none'
      if(proyectosh1.style.width < '392px'){
        proyectosh1.style.fontSize = "40px"
      }
    }
  }

  ngOnDestroy(): void {
    console.clear()
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
      alert("Uh-oh, an error occurred!");
    });
  }

  
}
