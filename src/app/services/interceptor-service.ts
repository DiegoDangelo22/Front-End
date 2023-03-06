import { HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";
import jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService {
    constructor(private tokenService: TokenService){}
    getUserId(): number {
        const token = this.tokenService.getToken();
        const decodedToken = jwtDecode(token) as any;
        return decodedToken.user_id;
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let intReq = req;
        const token = this.tokenService.getToken();
        if(token != null){
            const decodedToken = jwtDecode(token) as any;
            const userId = decodedToken.user_id;
            intReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer '+token),
                params: req.params.set('userId', userId)
            });
        }
        return next.handle(intReq);
    }
}

export const interceptorProvider = [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true }];
