import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Educacion } from 'src/app/model/educacion';
import { Usuario } from 'src/app/model/usuario';
import { EducacionService } from 'src/app/services/educacion.service';
import { TokenService } from 'src/app/services/token.service';
import { InterceptorService } from 'src/app/services/interceptor-service';
import { AuthService } from 'src/app/services/auth.service';
import { tap, finalize } from 'rxjs';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit, AfterViewInit {
  educacion: Educacion[] = [];
  nombreEdu: string = '';
  descripcionEdu: string = '';
  usuarioActual: Usuario;
  edu: Educacion;

  constructor(private educacionService: EducacionService, private tokenService: TokenService, private notif:AppComponent, private interceptServ: InterceptorService, private authService:AuthService) { }
  isLogged = false;
  isAdmin = false;
  loading: boolean;

  ngOnInit(): void {
    this.authService.getEducacion().subscribe(
      edu => {
        this.educacion = edu || [];
      },
      error => {
        console.log('Error al obtener la información de educación:', error);
      }
    );
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
    }
  }

  cargarEducacion(): void {
    this.educacionService.lista().subscribe(edu => {
      this.educacion = edu.filter(edu => edu.usuario.id === this.interceptServ.getUserId());
    });
  }

  onCreate(): void {
    const educacion = new Educacion(this.nombreEdu, this.descripcionEdu, this.interceptServ.getUserId());
    this.loading = true;
    this.educacionService.save(educacion).pipe(
      tap(() => { this.loading = true; }),
      finalize(() => { this.loading = false; })
    ).subscribe(
      data => {
        this.cargarEducacion();
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
          this.cargarEducacion()
        }, err => {
          alert("No se pudo eliminar");
        }
      )
    }
  }
}