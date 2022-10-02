import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    //Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    boolean{
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['login']);
      return false;
    }
    return this.auth.isLoggedIn();
  }
  
}
