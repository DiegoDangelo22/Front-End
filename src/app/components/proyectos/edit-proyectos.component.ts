import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/services/image.service';
import { InterceptorService } from 'src/app/services/interceptor-service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-edit-proyectos',
  templateUrl: './edit-proyectos.component.html',
  styleUrls: ['./edit-proyectos.component.css']
})
export class EditProyectosComponent implements OnInit {
  proyectos: Proyectos = null;
  proyecto: string = '';
  descripcion: string = '';
  img: string = '';
  constructor(private proyectosService: ProyectosService, private tokenService: TokenService, private activatedRoute: ActivatedRoute, private router: Router, public imgServ:ImageService, private interceptServ: InterceptorService) { }
  isLogged = false;
  isAdmin = false;
  ngOnInit(): void {
    // const id = this.activatedRoute.snapshot.params['id'];
    // this.proyectosService.detail(id).subscribe(data => {
    //   this.proyectos = data;
    // }, err => {
    //   alert("Error al modificar proyecto");
    //   this.router.navigate(['']);
    // })
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
  
  cargarProyectos(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.proyectosService.detail(id).subscribe(data => {
      this.proyectos = data;
      this.imgServ.url = this.proyectos.img
      this.proyecto = this.proyectos.proyecto;
      this.descripcion = this.proyectos.descripcion;
    })
  }

  onUpdate():void{
    const id = this.activatedRoute.snapshot.params['id'];
    if(this.imgServ.url === ""){
      this.proyectos.img;
    } else {
      this.proyectos.img = this.imgServ.url;
    }
    const proyec = new Proyectos(this.proyecto, this.descripcion, this.proyectos.img, this.interceptServ.getUserId())
    this.proyectosService.update(id, proyec).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar la información");
        this.router.navigate(['']);
      }
    )
  }

  uploadImage($event:any){
    const nombre = "proyecto_";
    this.imgServ.uploadImage($event, nombre)
  }

}
