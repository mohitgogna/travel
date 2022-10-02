import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, first, mapTo, Observable, of, tap, throwError } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly USERNAME = "USER";
  private username: string;

  constructor(private router: Router, private http: HttpClient) { }

  setToken(token: string) {
    sessionStorage.setItem(this.JWT_TOKEN, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.JWT_TOKEN);
  }

  setUsername(username){
    sessionStorage.setItem(this.USERNAME, username);
  }

  removeUsername(){
    sessionStorage.removeItem(this.USERNAME);
  }

  isLoggedIn() {
    //need to check if token is valid or not 

    //temporary
    // console.log(this.getToken())
    return this.getToken() != null;
  }

  doLogin(user: string, info: any) {
    this.setUsername(user);
    
    this.setToken(info.body.payload.token);
    //this.setToken(info.headers.get('x-auth-token'));    
    //this.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBkNjcxYTg4MDU2ZmJmMDYxMDU0YzgiLCJ1c2VybmFtZSI6ImFudWotYmFsIiwicm9sZXMiOlsiYXBpIiwid2ViQWRtaW4iXSwic3RhdHVzIjoicGVuZGluZyIsImlhdCI6MTY0NjU4NzYxMH0.4OsSfYovim5b4B2Nw2srX-ly590uSciWOLGOUuIK-UA");
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.removeUsername();
    this.router.navigate(['login']);
  }
  
  login({ username, password }: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/user/login`,{ username, password },{observe:'response'}).pipe(
      tap(info => this.doLogin(username, info)),
      mapTo(true),
      catchError(error => {
        console.log(`error occured. - ${error}`);
        return of(false);
      })
    )

  }

}
