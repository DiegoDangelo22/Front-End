import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/services/image.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit {
  proyectos: Proyectos[] = [];
  proyecto: string = '';
  descripcion: string = '';
  img: string = '';
  
  constructor(private router:Router, private proyectosService:ProyectosService, public imgServ:ImageService, private tokenService:TokenService, private notif:AppComponent, private activatedRoute:ActivatedRoute) { }
  isLogged = false;
  isAdmin = false;
  ngOnInit(): void {
    this.cargarProyectos();
    this.imgServ.url = ''


      
    
    
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

  cargarProyectos():void{
    this.proyectosService.lista().subscribe(data => {
      this.proyectos = data;
    });
  }

  onCreate(): void{
    this.img = this.imgServ.url
      const proye = new Proyectos(this.proyecto, this.descripcion, this.img);
      this.proyectosService.save(proye).subscribe(data => {
      this.notif.noti();
    }, err => {
      alert(err.error.mensaje);
    })
    
  }

  uploadImage($event:any){
    // this.proyectos.forEach(element  => {let asd = element.id;console.log(asd)})
    
      // console.log(this.proyectos.pop().id)


      this.proyectosService.lista().subscribe(data => {
        this.proyectos = data;
        
      if(this.proyectos.length === 0) {
        
          
          let noombrreeeid = 1;
        const nombre = "proyecto_" + noombrreeeid;
        this.imgServ.uploadImage($event, nombre)
        } else {
          let noombrreeeid = this.proyectos.pop().id + 1;
        const nombre = "proyecto_" + noombrreeeid;
 

          this.imgServ.uploadImage($event, nombre)
          
          
        
        }
      })
      
    
      
        
      
  }

}
