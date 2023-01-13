import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../model/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  URL = environment.URL + 'hys/';

  constructor(private http:HttpClient) { }

  public lista(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.URL + 'lista');
  }

  public detail(id:number): Observable<Skill>{
    return this.http.get<Skill>(this.URL + `detail/${id}`);
  }

  public save(skill:Skill): Observable<any>{
    return this.http.post<any>(this.URL + 'create', skill);
  }

  public update(id:number, skill:Skill): Observable<any>{
    return this.http.put<any>(this.URL + `update/${id}`, skill);
  }

  public delete(id:number): Observable<any>{
    return this.http.delete(this.URL + `delete/${id}`);
  }
}
