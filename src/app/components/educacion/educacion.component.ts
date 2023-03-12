import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Educacion } from 'src/app/model/educacion';
import { Usuario } from 'src/app/model/usuario';
import { EducacionService } from 'src/app/services/educacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InterceptorService } from 'src/app/services/interceptor-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacion: Educacion[] = [];
  nombreEdu: string = '';
  descripcionEdu: string = '';
  usuarioActual: Usuario;
  edu: Educacion;

  constructor(private educacionService: EducacionService, private tokenService: TokenService, private notif:AppComponent, private http: HttpClient, private interceptServ: InterceptorService, private usuarioService: UsuarioService, private authService:AuthService) { }
  isLogged = false;
  isAdmin = false;

  ngOnInit(): void {
    this.authService.getEducacion().subscribe(
      edu => {
        this.educacion = edu || [];
        console.log(this.educacion)
      },
      error => {
        console.log('Error al obtener la información de educación:', error);
      }
    );
    
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

    if(this.isLogged == true) {
      setTimeout(() => {
        var modaledu:HTMLElement = document.querySelector('.modaledu');
      var btnedu:HTMLElement = document.querySelector('.newedu');
      btnedu.addEventListener('click', ()=> {
        modaledu.style.display = "flex";
        window.onclick = function(event) {
          if (event.target == modaledu) {
            modaledu.style.display = "none";
          }
        } 
      })
      }, 1000);
    }
    
  }

  // cargarEducacion(): void {
  //   if(this.tokenService.getToken()){
  //     this.educacionService.lista().subscribe(
  //       data =>{
  //         this.user = data;
  //         console.log(this.user)
  //       }
  //     )
  //   } else {
  //     this.educacionService.detail(106).subscribe(data => {this.user = data;console.log(this.user)});
  //   }
    
  // }

  // mostrarEducacion(educacion: Educacion): boolean {
  //   this.http.get(environment.URL + 'auth/user-id').subscribe(data => {
  //     let user_id:any = data;
  //   })
  //   return educacion.usuarioId === this.user_id;
  //   }

  // obtenerUsuarioActual(): void {
  //     this.usuarioService.getUsuarioById().subscribe(data => {
  //       this.usuarioActual = data;
  //     });
  // }

  mostrarEducacion(educacion: Educacion): any {
    if(educacion && this.tokenService.getToken()){
      const eduUser = this.educacion.find(edu => edu.usuario.id === 27);
      return eduUser;
    } else {
      return false;
    }
  }

  onCreate(): void {
    const educacion = new Educacion(this.nombreEdu, this.descripcionEdu, this.interceptServ.getUserId());
    this.educacionService.save(educacion).subscribe(
      data => {
        this.notif.noti();
      }, err => {
        alert("Falló");
      }
    )
    
  }

  borrar(id?: number){
    if(id != undefined){
      this.educacionService.delete(id).subscribe(
        data => {
          // this.cargarEducacion();
        }, err => {
          alert("No se pudo eliminar");
        }
      )
    }
  }
}