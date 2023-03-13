import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { InvalidTokenError } from 'jwt-decode';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../model/educacion';
import { Experiencia } from '../model/experiencia';
import { JwtDto } from '../model/jwt-dto';
import { LoginUsuario } from '../model/login-usuario';
import { NuevoUsuario } from '../model/nuevo-usuario';
import { Persona } from '../model/persona.model';
import { Usuario } from '../model/usuario';
import { EducacionService } from './educacion.service';
import { ExperienciaService } from './experiencia.service';
import { InterceptorService } from './interceptor-service';
import { PersonaService } from './persona.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = environment.URL + 'auth/';
  persona2: Persona[] = [];
  persona: Persona = null;
  isLogged = false;

  private isLogged2 = new BehaviorSubject<boolean>(this.tokenService.getToken() !== null);
  isAuthenticated$: Observable<boolean> = this.isLogged2.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.tokenService.getToken() !== null);
  isAuthenticated2$ = this.isAuthenticatedSubject.asObservable();

  get isAuthenticated2(): Observable<boolean> {
    return this.isAuthenticated2$;
  }

  checkIsAuthenticated() {
    try {
      this.isAuthenticatedSubject.next(this.tokenService.getToken() !== null);
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        // Manejar el error de token inválido
        console.log("Token inválido");
        this.isAuthenticatedSubject.next(false);
      } else {
        // Reenviar el error
        throw error;
      }
    }
  }
  

  constructor(private httpClient: HttpClient, private tokenService: TokenService, public persoServ: PersonaService, public interceptServ:InterceptorService, public educacionService:EducacionService, public experienciaService:ExperienciaService, public personaService:PersonaService) { }


  isAuthenticated(): boolean {
    
    if(this.tokenService.getToken() !== undefined || this.tokenService.getToken() !== null) {
      return this.isLogged = true;
    } else {
      return this.isLogged = false;
    }
  }

  hasPermissions(persona: Persona): boolean {
    return persona.usuario.id === this.interceptServ.getUserId();
  }

  getAbout(): Observable<Persona[]> {
    if (this.isAuthenticated()) {
      return this.personaService.lista().pipe(
        map(persona => {
          return persona.filter(perso => perso.usuario.id === this.interceptServ.getUserId());
        })
      );
    } else {
      return this.personaService.lista().pipe(
        map(persona => {
          return persona.filter(perso => perso.usuario.id === 1);
        })
      );
    }
  }

  getEducacion(): Observable<Educacion[]> {
    if (this.isAuthenticated()) {
      return this.educacionService.lista().pipe(
        map(educaciones => {
          return educaciones.filter(edu => edu.usuario.id === this.interceptServ.getUserId());
        })
      );
    } else {
      return this.educacionService.lista().pipe(
        map(educaciones => {
          return educaciones.filter(edu => edu.usuario.id === 1);
        })
      );
    }
  }


  getExperiencia(): Observable<Experiencia[]> {
    if (this.isAuthenticated()) {
      return this.experienciaService.lista().pipe(
        map(experiencias => {
          return experiencias.filter(exp => exp.usuario.id === this.interceptServ.getUserId());
        })
      );
    } else {
      return this.experienciaService.lista().pipe(
        map(experiencias => {
          return experiencias.filter(exp => exp.usuario.id === 1);
        })
      );
    }
  }
  

 public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
   return this.httpClient.post<JwtDto>(this.URL + 'nuevo', nuevoUsuario).pipe(
    tap((res: JwtDto) => {
      console.log(res); // agregar esta línea para ver la respuesta del backend

    }
  ));
 }

 public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
   return this.httpClient.post<JwtDto>(this.URL + 'login', loginUsuario)
 }
}
