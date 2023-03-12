import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { environment } from 'src/environments/environment';
import { InterceptorService } from './interceptor-service';
import { EducacionService } from './educacion.service';
import { Educacion } from '../model/educacion';
import { ExperienciaService } from './experiencia.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment;

  constructor(private http: HttpClient, private interceptServ: InterceptorService) { }
  
  getUsuarioById(): Observable<Usuario> {
    let userId = this.interceptServ.getUserId();
    const url = `${this.apiUrl}/auth/user-id?userId=${userId}`;
    return this.http.get<Usuario>(url);
  }

}