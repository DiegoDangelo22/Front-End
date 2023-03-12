import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
// const USERID_KEY = 'AuthUserId';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  roles: Array<string>  = [];
  isLogged = false;

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken():any {
    if(!sessionStorage.getItem(TOKEN_KEY)){
      window.sessionStorage.setItem(TOKEN_KEY, "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjEyIiwidXNlcklkIjoyNywiaWF0IjoxNjc4NjU0MzI3LCJleHAiOjE2Nzg2OTAzMjd9.sEdIKQ0Gv_zRMAOb-il09l45GR7rOJmBA6GWjikOuNEOcTIoGF4Sml-gaUeJbfyUDyDB860AjOVcx90NJpx92w")
      window.sessionStorage.setItem(USERNAME_KEY, "Diego")
      // window.sessionStorage.setItem(USERID_KEY, "27");
      window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify([{"authority":"ROLE_ADMIN"},{"authority":"ROLE_USER"}]))
      return sessionStorage.getItem(TOKEN_KEY);
    } else {
      return sessionStorage.getItem(TOKEN_KEY)!;
  }
  }

  public setUserName(userName: string): void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName():string {
    return sessionStorage.getItem(USERNAME_KEY)!;
  }

  public setAuthorities(authorities: string[]):void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[]{
    this.roles = [];
    if(sessionStorage.getItem(AUTHORITIES_KEY)){
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((authority:any) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public logOut(): void{
    window.sessionStorage.clear();
  }
}
