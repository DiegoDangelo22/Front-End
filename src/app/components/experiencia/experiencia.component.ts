import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Experiencia }from 'src/app/model/experiencia';
import { Usuario } from 'src/app/model/usuario';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';
import { InterceptorService } from 'src/app/services/interceptor-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit, AfterViewInit {
  exp: Experiencia[] = [];
  nombreExp: string = '';
  descripcionExp: string = '';
  usuarioActual: Usuario;
  experiencia: Experiencia;

  constructor(private expService: ExperienciaService, private tokenService: TokenService, private notif:AppComponent, private interceptServ: InterceptorService, private authService: AuthService) {}

  isLogged = false;
  isAdmin = false;

  ngOnInit(): void {
    this.authService.getExperiencia().subscribe(exp => {
      this.exp = exp || [];
    });
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

  ngAfterViewInit(): void {
    if(this.isLogged == true) {
      var modalexp:HTMLElement = document.querySelector('.modalexp');
      var btnexp:HTMLElement = document.querySelector('.newexp');
      btnexp.addEventListener('click', ()=> {
        modalexp.style.display = "flex";
        window.onclick = function(event) {
          if (event.target == modalexp) {
            modalexp.style.display = "none";
          }
        } 
      })
    }
  }

  cargarExperiencia(): void {
    this.expService.lista().subscribe(exp => {
      this.exp = exp.filter(exp => exp.usuario.id === this.interceptServ.getUserId());
    });
  }

  delete(id?: number){
    if(id != undefined){
      this.expService.delete(id).subscribe(data => {
        this.cargarExperiencia();
      }, err => {
        alert("No se pudo borrar la experiencia");
      })
    }
  }

  onCreate(): void{
    const expe = new Experiencia(this.nombreExp, this.descripcionExp, this.interceptServ.getUserId());
    this.expService.save(expe).subscribe(data => {
      this.cargarExperiencia();
      this.notif.noti();
    }, err => {
      alert("Falló");
    })
  }
}