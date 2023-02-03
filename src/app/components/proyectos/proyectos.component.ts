import { Component, OnInit } from '@angular/core';
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
export class ProyectosComponent implements OnInit {
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


    if(this.isAdmin == true) {
      // setTimeout(() => {
      //   var modalproyecto:HTMLElement = document.querySelector('.modalproyecto');
      // var btn1:HTMLElement = document.querySelector('#add1');
      // var btn2:HTMLElement = document.querySelector('#add2');
      // btn1.addEventListener('click', ()=> {
      //   modalproyecto.style.display = "flex";
      //   window.onclick = function(event) {
      //     if (event.target == modalproyecto) {
      //       modalproyecto.style.display = "none";
      //     }
      //   } 
      // });
      // btn2.addEventListener('click', ()=> {
      //   modalproyecto.style.display = "flex";
      //   window.onclick = function(event) {
      //     if (event.target == modalproyecto) {
      //       modalproyecto.style.display = "none";
      //     }
      //   } 
      // });
      // }, 1000);
    }
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
