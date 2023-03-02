import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/services/image.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  
  constructor(private router:Router, private proyectosService:ProyectosService, public imgServ:ImageService, private tokenService:TokenService, private notif:AppComponent, private activatedRoute:ActivatedRoute, private http: HttpClient) { }
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

      this.http.get(environment.URL + 'proyectos/data').subscribe(data => {
      let proyectodata:any = data;

        const id = proyectodata;
        let noombrreeeid = id;
        const nombre = "proyecto_" + noombrreeeid;
        this.imgServ.uploadImage($event, nombre)
      
      }, error => {
        console.error(error);
      });
      
  }

}
