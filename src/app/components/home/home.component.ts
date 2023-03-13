import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode, { InvalidTokenError } from 'jwt-decode';
import { catchError, Observable } from 'rxjs';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { InterceptorService } from 'src/app/services/interceptor-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogged = false;
  isAdmin = false;
  isAuthenticated$: Observable<boolean>;
  hasError = false;
  educacionDefault: Educacion = null;

  constructor(
    private tokenServ: TokenService,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private educacionService: EducacionService,
    private experienciaService: ExperienciaService,
    private interceptService: InterceptorService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if(this.tokenServ.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }


    // this.isAuthenticated$ = this.authService.isAuthenticated2.pipe(
    //   map((response) => response),
    //   catchError((error) => {
    //     console.log(error);
    //     if (error instanceof InvalidTokenError) {
    //       this.hasError = true;
    //     }
    //     return of(false);
    //   })
    // );
    
  }
    
  usuarioDefault() {
    // this.educacionDefault = this.educacionService.detail(106)
    // console.log(this.experienciaService.detail(106));
  }

  cargarEducacionDefault():void {
    // this.educacionService.detail(106).subscribe(data => {this.educacionDefault = data;console.log(data)});
  }
}