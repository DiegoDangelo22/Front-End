import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  URL = environment.URL + 'personas/';

  constructor(private http: HttpClient) { }

  public getPersona(): Observable<Persona>{
    return this.http.get<Persona>(this.URL+ 'traer/perfil');
  }
}
