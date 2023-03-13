import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Experiencia }from 'src/app/model/experiencia';
import { Usuario } from 'src/app/model/usuario';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { InterceptorService } from 'src/app/services/interceptor-service';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  exp: Experiencia[] = [];
  nombreExp: string = '';
  descripcionExp: string = '';

  usuarioActual: Usuario;
  experiencia: Experiencia;

  constructor(private expService: ExperienciaService, private tokenService: TokenService, private notif:AppComponent, private router:Router, private interceptServ: InterceptorService, private usuarioService: UsuarioService, private authService: AuthService)
   {

   }

  isLogged = false;
  isAdmin = false;

  ngOnInit(): void {
    this.authService.getExperiencia().subscribe(exp => {
      this.exp = exp || []; // asegurarse de manejar el caso en que edu es null
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
    // if((this.tokenService.getAuthorities()[0] && this.tokenService.getAuthorities()[1])){
    //   this.isAdmin = true;
    // } else {
    //   this.isAdmin = false;
    // }

    if(this.isLogged == true) {
      setTimeout(() => {
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
      }, 1000);
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

  // obtenerUsuarioActual(): void {
  //   this.usuarioService.getUsuarioById().subscribe(data => {
  //     this.usuarioActual = data;
  //   });
  // }

  mostrarExperiencia(experiencia: Experiencia): any {
    if(experiencia && this.tokenService.getToken()){
      const expUser = this.exp.find(experiencia => experiencia.usuario.id === 27);
      return expUser;
    } else {
      return false;
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