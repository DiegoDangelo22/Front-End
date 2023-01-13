import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  URL = environment.URL + 'personas/';

  constructor(private http: HttpClient) { }

  public lista():Observable<Persona[]>{
    return this.http.get<Persona[]>(this.URL + 'lista');
  }

  public detail(id: number):Observable<Persona>{
    return this.http.get<Persona>(this.URL + `detail/${id}`);
  }

  public save(persona: Persona):Observable<any>{
    return this.http.post<any>(this.URL + 'create', persona);
  }

  public update(id: number, persona: Persona):Observable<any>{
    return this.http.put<any>(this.URL + `update/${id}`, persona);
  }

  public delete(id: number):Observable<any>{
    return this.http.delete<any>(this.URL + `delete/${id}`);
  }
}
