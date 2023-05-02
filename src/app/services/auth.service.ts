import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../model/educacion';
import { Experiencia } from '../model/experiencia';
import { JwtDto } from '../model/jwt-dto';
import { LoginUsuario } from '../model/login-usuario';
import { NuevoUsuario } from '../model/nuevo-usuario';
import { Persona } from '../model/persona.model';
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
  isLogged = false;

  constructor(private httpClient: HttpClient, private tokenService: TokenService, public interceptServ:InterceptorService, public educacionService:EducacionService, public experienciaService:ExperienciaService, public personaService:PersonaService) { }

  isAuthenticated(): boolean {
    if(this.tokenService.getToken() !== undefined || this.tokenService.getToken() !== null) {
      return this.isLogged = true;
    } else {
      return this.isLogged = false;
    }
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
   return this.httpClient.post<JwtDto>(this.URL + 'nuevo', nuevoUsuario)
 }

 public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
   return this.httpClient.post<JwtDto>(this.URL + 'login', loginUsuario)
 }
}