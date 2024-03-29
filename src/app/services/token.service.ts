import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  roles: Array<string>  = [];
  isLogged = false;

  constructor() { }

  public setToken(token: string):void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken():any {
    if(!sessionStorage.getItem(TOKEN_KEY)){
      window.sessionStorage.setItem(TOKEN_KEY, "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwidXNlcklkIjoxLCJpYXQiOjE2Nzg2ODkwNzEsImV4cCI6MzY3ODcyNTA3MX0.HtTWVp5Gqs0kOV2-fSX9FMilRlL_iFuZp_PEsSgKDmwJiCEfg7Bwg3VpJoGKIlfvejsRPJuLQrmeKrW4o_2aag")
      window.sessionStorage.setItem(USERNAME_KEY, "test")
      window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify([{"authority":"ROLE_USER"}]))
      return sessionStorage.getItem(TOKEN_KEY);
    } else {
      return sessionStorage.getItem(TOKEN_KEY)!;
    }
  }

  public setUserName(userName: string):void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName():string {
    return sessionStorage.getItem(USERNAME_KEY)!;
  }

  public setAuthorities(authorities: string[]):void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities():string[] {
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