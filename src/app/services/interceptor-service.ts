import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, EMPTY, finalize, Observable, tap, throwError } from "rxjs";
import { TokenService } from "./token.service";
import jwtDecode from 'jwt-decode';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class InterceptorService {
    constructor(private tokenService: TokenService, private router: Router){}
    getUserId(): any {
      try {
        const token = this.tokenService.getToken();
          const decodedToken = jwtDecode(token) as any;
          console.log(decodedToken)
          return decodedToken.userId;
    } catch (error:any) {
       return console.log(error);
    }
    
    }
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.tokenService.getToken();
      if(token){
        req = req.clone({
          setHeaders:{
            Authorization: `Bearer ${token}`
          }
        });
      }
      return next.handle(req).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401 && error.error && error.error.message === 'Invalid token specified') {
            // token inválido
            this.tokenService.logOut();
            this.router.navigate(['/login']);
            return EMPTY;
          } else {
            // otro tipo de error
            return throwError(error);
          }
        }),
        finalize(() => {
          const userId = this.getUserId();
          console.log('UserId:', userId);
        })
      );
    }
  
      
}

export const interceptorProvider = [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true }];
