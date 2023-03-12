import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { Persona } from '../model/persona.model';
import { AuthService } from './auth.service';
import { PersonaService } from './persona.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivateChild {
  constructor(private authService: AuthService, private personaService: PersonaService, private router: Router) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    console.log("Guard executed");
    const isAuthenticated = this.authService.isAuthenticated();
    const id = route.params['id'];
    return this.personaService.detail(id).pipe(
      map((persona: Persona) => {
        const hasPermissions = this.authService.hasPermissions(persona);
        console.log("isAuthenticated", isAuthenticated);
        console.log("hasPermissions", hasPermissions);
        if (isAuthenticated && hasPermissions) {
          return true;
        } else {
          return this.router.createUrlTree(['/login']);
        }
      }),
      catchError(() => of(this.router.createUrlTree(['/notfound'])))
    );
  }
  
}
